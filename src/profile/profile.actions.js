import { getInstance as getD2 } from 'd2'
import Action from 'd2-ui/lib/action/Action.js'
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators.js'
import log from 'loglevel'
import userSettingsActions from '../app.actions.jsx'
import i18n from '../locales/index.js'
import userSettingsKeyMapping from '../userSettingsMapping.js'
import isValidWhatsApp from './isValidWhatsApp.js'
import userProfileStore from './profile.store.js'

// Add whatsApp validation to the validator set
wordToValidatorMap.set('whats_app', isValidWhatsApp)

const userProfileActions = Action.createActionsFromNames(['save'])

userProfileActions.save.subscribe(({ data, complete, error }) => {
    const [key, value] = data
    let payload = { [key]: String(value).trim() || ' ' } // TODO: Ugly hack to allow saving empty fields

    if (key === 'birthday') {
        const date = new Date(value)
        payload = { [key]: date.toISOString() }
    }

    getD2().then((d2) => {
        userProfileStore.state[key] = value
        userProfileStore.setState(userProfileStore.state)

        // Run field validators
        if (Array.isArray(userSettingsKeyMapping[key].validators)) {
            const validators = userSettingsKeyMapping[key].validators
            if (
                !validators.reduce(
                    (prev, curr) => prev && wordToValidatorMap.get(curr)(value),
                    true
                )
            ) {
                log.warn(
                    `One or more validators did not pass for field "${key}" and value "${value}"`
                )
                return
            }
        }

        getProfileUpdatePromise({
            key,
            value,
            payload,
            userId: userProfileStore.state.id,
            d2,
        })
            .then(() => {
                log.debug('User Profile updated successfully.')
                userSettingsActions.showSnackbarMessage({
                    message: i18n.t('User profile updated'),
                    status: 'success',
                })
                complete()
            })
            .catch((err) => {
                userSettingsActions.showSnackbarMessage({
                    message: i18n.t('Failed to update user profile'),
                    status: 'error',
                })
                log.error('Failed to update user profile:', err)
                error()
            })
    })
})

function getProfileUpdatePromise({ key, value, payload, userId, d2 }) {
    const api = d2.Api.getApi()
    if (key === 'avatar') {
        if (value) {
            // Set avatar
            return api.update('me', { avatar: { id: value.id } })
        } else {
            // Clear avatar
            return removeAvatar(userId, api)
        }
    }

    return api.update('me', payload)
}

async function removeAvatar(userId, api) {
    const url = `/users/${userId}`
    const user = await api.get(url, { fields: ':owner' })
    delete user.avatar
    return api.update(url, user)
}

export default userProfileActions
