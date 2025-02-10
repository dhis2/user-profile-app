import { useState, useEffect } from 'react'
import optionValueStore from '../../optionValue.store.js'
import userProfileStore from '../../profile/profile.store.js'

export const twoFactorAuthTypes = {
    totp: 'totp',
    email: 'email',
}

const twoFactorBackendTypesToAuthTypes = {
    TOTP_ENABLED: twoFactorAuthTypes.totp,
    EMAIL_ENABLED: twoFactorAuthTypes.email,
}

export default function useTwoFaToggleMutation() {
    const getTWOFAType = (BETwoFAType) =>
        twoFactorBackendTypesToAuthTypes[BETwoFAType] || null
    const [enabledTwoFAType, setEnabledTwoFAType] = useState(
        getTWOFAType(userProfileStore.state.twoFactorType)
    )
    const getAvailableTwoFAType = (BEAvailableTwoFAType) =>
        BEAvailableTwoFAType
            ? Object.entries(BEAvailableTwoFAType)
                  .filter(([, value]) => value) // Keep only entries where value is "true"
                  .map(([key]) => getTWOFAType(key))
                  .filter((type) => type !== null)
            : []
    const [availableTwoFAType, setAvailableTwoFAType] = useState(
        getAvailableTwoFAType(optionValueStore?.state.twoFactorMethods)
    )
    const { emailVerified } = userProfileStore.state

    const resetTwoFactorType = (twoFactorType) => {
        const BETwoFactorBackendType = Object.entries(
            twoFactorBackendTypesToAuthTypes
        ).find(([, type]) => type === twoFactorType)?.[0]
        userProfileStore.state.twoFactorType = enabledTwoFAType
            ? undefined
            : BETwoFactorBackendType
        userProfileStore.setState(userProfileStore.state)
    }

    useEffect(() => {
        const subscription = userProfileStore.subscribe(({ twoFactorType }) => {
            setEnabledTwoFAType(getTWOFAType(twoFactorType))
        })
        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        const subscription = optionValueStore.subscribe(
            ({ twoFactorMethods }) => {
                setAvailableTwoFAType(getAvailableTwoFAType(twoFactorMethods))
            }
        )
        return () => subscription.unsubscribe()
    }, [])

    return {
        enabledTwoFAType,
        availableTwoFAType,
        resetTwoFactorType,
        emailVerified,
    }
}
