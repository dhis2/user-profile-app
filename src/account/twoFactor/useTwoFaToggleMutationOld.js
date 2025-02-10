import { useDataMutation, useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useMemo, useState, useEffect } from 'react'
import userProfileStore from '../../profile/profile.store.js'

const mutationDefinitionBase = {
    type: 'create',
    data: ({ code }) => ({ code }),
}
const enableMutationDefinition = {
    ...mutationDefinitionBase,
    resource: '/2fa/enabled',
}
const disableMutationDefinition = {
    ...mutationDefinitionBase,
    resource: '/2fa/disabled',
}

const getAlertMessage = ({ attemptingToEnableTwoFa, error }) => {
    if (attemptingToEnableTwoFa) {
        if (error) {
            return (
                error?.message ??
                i18n.t('Could not enable 2 Factor Authentication')
            )
        } else {
            return i18n.t('Two factor authentication was enabled successfully')
        }
    } else {
        if (error) {
            return (
                error?.message ??
                i18n.t('Could not disable two factor authentication')
            )
        } else {
            return i18n.t('Two factor authentication was disabled successfully')
        }
    }
}

const getAlertOptions = ({ error }) =>
    error ? { critical: true } : { success: true }

export default function useTwoFaToggleMutationOld() {
    const [isTwoFaEnabled, setIsTwoFaEnabled] = useState(
        userProfileStore.state.twoFaEnabled
    )
    const [
        lastActionWasTwoFaDisableSuccess,
        setLastActionWasTwoFaDisableSuccess,
    ] = useState(false)
    const { show: showAlert } = useAlert(getAlertMessage, getAlertOptions)
    const mutationOptions = useMemo(() => {
        const attemptingToEnableTwoFa = !isTwoFaEnabled
        return {
            onComplete: () => {
                userProfileStore.state.twoFaEnabled = attemptingToEnableTwoFa
                userProfileStore.setState(userProfileStore.state)
                setLastActionWasTwoFaDisableSuccess(!attemptingToEnableTwoFa)
                showAlert({ attemptingToEnableTwoFa })
            },
            onError: (error) => {
                console.error(error)
                setLastActionWasTwoFaDisableSuccess(false)
                showAlert({ attemptingToEnableTwoFa, error })
            },
        }
    }, [isTwoFaEnabled, showAlert])
    const enableDataMutation = useDataMutation(
        enableMutationDefinition,
        mutationOptions
    )
    const disableDataMutation = useDataMutation(
        disableMutationDefinition,
        mutationOptions
    )
    const [toggleTwoFa, currentMutation] = isTwoFaEnabled
        ? disableDataMutation
        : enableDataMutation

    useEffect(() => {
        const subscription = userProfileStore.subscribe(({ twoFaEnabled }) => {
            setIsTwoFaEnabled(twoFaEnabled)
        })
        return () => subscription.unsubscribe()
    }, [])

    return {
        isTwoFaEnabled,
        loading: currentMutation.loading || currentMutation.fetching,
        error: currentMutation.error,
        toggleTwoFa,
        lastActionWasTwoFaDisableSuccess,
    }
}
