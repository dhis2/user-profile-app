jest.mock('d2', () => ({
    getInstance: jest.fn(),
}))

jest.mock('d2-ui/lib/action/Action.js', () => ({
    __esModule: true,
    default: {
        createActionsFromNames: () => ({
            save: { subscribe: jest.fn() },
        }),
    },
}))

jest.mock('d2-ui/lib/forms/Validators.js', () => ({
    wordToValidatorMap: new Map(),
}))

jest.mock('loglevel', () => ({
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
}))

jest.mock('../../app.actions.jsx', () => ({
    __esModule: true,
    default: {
        showSnackbarMessage: jest.fn(),
    },
}))

jest.mock('../../locales/index.js', () => ({
    __esModule: true,
    default: { t: (key) => key },
}))

jest.mock('../../userSettingsMapping.js', () => ({
    __esModule: true,
    default: {},
}))

jest.mock('../isValidWhatsApp.js', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../profile.store.js', () => ({
    __esModule: true,
    default: { state: {}, setState: jest.fn() },
}))

import { getProfileUpdatePromise } from '../profile.actions.js'

describe('getProfileUpdatePromise', () => {
    let mockApi

    beforeEach(() => {
        mockApi = {
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            get: jest.fn().mockResolvedValue({}),
        }
    })

    it('should call api.delete("me/avatar") when removing avatar', async () => {
        const d2 = { Api: { getApi: () => mockApi } }

        await getProfileUpdatePromise({
            key: 'avatar',
            value: null,
            payload: { avatar: 'null' },
            d2,
        })

        expect(mockApi.delete).toHaveBeenCalledWith('me/avatar')
        expect(mockApi.delete).toHaveBeenCalledTimes(1)
        expect(mockApi.update).not.toHaveBeenCalled()
    })

    it('should not call GET or PUT on /users endpoint when removing avatar', async () => {
        const d2 = { Api: { getApi: () => mockApi } }

        await getProfileUpdatePromise({
            key: 'avatar',
            value: null,
            payload: { avatar: 'null' },
            d2,
        })

        expect(mockApi.get).not.toHaveBeenCalled()
    })

    it('should call api.update with avatar id when setting avatar', async () => {
        const d2 = { Api: { getApi: () => mockApi } }
        const avatarId = 'abc123'

        await getProfileUpdatePromise({
            key: 'avatar',
            value: { id: avatarId },
            payload: { avatar: JSON.stringify({ id: avatarId }) },
            d2,
        })

        expect(mockApi.update).toHaveBeenCalledWith('me', {
            avatar: { id: avatarId },
        })
        expect(mockApi.update).toHaveBeenCalledTimes(1)
        expect(mockApi.delete).not.toHaveBeenCalled()
    })

    it('should call api.update with payload for non-avatar fields', async () => {
        const d2 = { Api: { getApi: () => mockApi } }
        const payload = { firstName: 'John' }

        await getProfileUpdatePromise({
            key: 'firstName',
            value: 'John',
            payload,
            d2,
        })

        expect(mockApi.update).toHaveBeenCalledWith('me', payload)
        expect(mockApi.update).toHaveBeenCalledTimes(1)
        expect(mockApi.delete).not.toHaveBeenCalled()
    })
})
