import { useDataMutation, useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useMemo, useState } from 'react'
import userProfileStore from '../../profile/profile.store.js'

const mutationBase = {
    type: 'create',
    data: ({ code }) => ({ code }),
}
const enableMutation = {
    ...mutationBase,
    resource: '/2fa/enabled',
}
const disableMutation = {
    ...mutationBase,
    resource: '/2fa/disabled',
}

const getAlertMessage = ({ originalIsTwoFactorOn, error }) => {
    if (originalIsTwoFactorOn) {
        if (error) {
            return (
                error?.message ??
                i18n.t('Could not disable two factor authentication')
            )
        } else {
            return i18n.t('Two factor authentication was disabled successfully')
        }
    } else {
        if (error) {
            return (
                error?.message ??
                i18n.t('Could not enable 2 Factor Authentication')
            )
        } else {
            return i18n.t('Two factor authentication was enabled successfully')
        }
    }
}

const getAlertOptions = ({ error }) =>
    error ? { critical: true } : { success: true }

export default function useTwoFaToggleMutation({ isTwoFactorOn }) {
    const [
        lastActionWasTwoFaDisableSuccess,
        setLastActionWasTwoFaDisableSuccess,
    ] = useState(false)
    const { show: showAlert } = useAlert(getAlertMessage, getAlertOptions)
    const mutationOptions = useMemo(
        () => ({
            onComplete: () => {
                userProfileStore.state.twoFaEnabled = !isTwoFactorOn
                userProfileStore.setState(userProfileStore.state)
                setLastActionWasTwoFaDisableSuccess(isTwoFactorOn)
                showAlert({ originalIsTwoFactorOn: isTwoFactorOn })
            },
            onError: (error) => {
                console.error(error)
                setLastActionWasTwoFaDisableSuccess(false)
                showAlert({ originalIsTwoFactorOn: isTwoFactorOn, error })
            },
        }),
        [isTwoFactorOn, showAlert]
    )
    const enableDataMutation = useDataMutation(enableMutation, mutationOptions)
    const disableDataMutation = useDataMutation(
        disableMutation,
        mutationOptions
    )
    const [toggleTwoFa, currentMutation] = isTwoFactorOn
        ? disableDataMutation
        : enableDataMutation

    return {
        loading: currentMutation.loading || currentMutation.fetching,
        error: currentMutation.error,
        toggleTwoFa,
        lastActionWasTwoFaDisableSuccess,
    }
}
