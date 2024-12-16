import { useDataQuery, useAlert } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'

const getUserProfileQuery = {
    me: {
        resource: 'me',
    },
}
const getSystemSettingsQuery = {
    systemSettings: {
        resource: 'systemSettings',
    },
}

const VerifyEmailWarning = () => {
    const { data: userData, error: userError } =
        useDataQuery(getUserProfileQuery)
    const { data: systemData, error: systemError } = useDataQuery(
        getSystemSettingsQuery
    )

    const errorAlert = useAlert(({ message }) => message, { critical: true })

    const enforceVerifiedEmail =
        systemData?.systemSettings?.enforceVerifiedEmail
    const emailVerified = userData?.me?.emailVerified

    if (userError || systemError) {
        errorAlert.show({
            message: i18n.t('Error fetching user or system data.'),
        })
        return null
    }

    if (enforceVerifiedEmail && !emailVerified) {
        return (
            <NoticeBox warning>
                {i18n.t(
                    'Your email is not verified. Please verify your email to continue using the system.'
                )}
            </NoticeBox>
        )
    }

    return null
}

export default VerifyEmailWarning
