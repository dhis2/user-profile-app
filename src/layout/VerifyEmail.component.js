import { useAlert, useDataQuery } from '@dhis2/app-runtime'
import { Button, CircularLoader } from '@dhis2/ui'
import { getInstance as getD2 } from 'd2'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const systemSettingsQuery = {
    systemSettings: {
        resource: 'systemSettings',
    },
}

export function VerifyEmail({ userEmail }) {
    const errorAlert = useAlert(({ message }) => message, { critical: true })
    const successAlert = useAlert(({ message }) => message, { success: true })
    const [isLoading, setIsLoading] = useState(false)
    const { data, loading: systemInfoLoading } =
        useDataQuery(systemSettingsQuery)

    const keyEmailHostname = data?.systemSettings?.keyEmailHostname
    const keyEmailUsername = data?.systemSettings?.keyEmailUsername

    const emailConfigured = !!keyEmailHostname && !!keyEmailUsername

    const isButtonDisabled =
        systemInfoLoading || !emailConfigured || !userEmail?.trim() || isLoading

    if (systemInfoLoading) {
        return <CircularLoader />
    }
    const handleEmailVerification = async () => {
        setIsLoading(true)
        try {
            const d2 = await getD2()
            const api = d2.Api.getApi()
            api.baseUrl = 'http://localhost:8080/api/'

            await api.post('account/sendEmailVerification')
            successAlert.show({
                message: 'Email verification link sent successfully!',
            })
        } catch (err) {
            console.error('Error:', err)
            errorAlert.show({
                message:
                    err.message || 'Failed to send email verification link.',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
                secondary
                onClick={handleEmailVerification}
                disabled={isButtonDisabled}
            >
                Verify Email
            </Button>
            {isLoading && <CircularLoader small />}
        </div>
    )
}
VerifyEmail.propTypes = {
    userEmail: PropTypes.string.isRequired,
}
