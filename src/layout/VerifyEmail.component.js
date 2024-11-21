import { useAlert, useDataMutation, useConfig } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../locales/index.js'

const sendEmailVerificationMutation = {
    resource: 'account/sendEmailVerification',
    type: 'create',
}

export function VerifyEmail({ userEmail }) {
    const errorAlert = useAlert(({ message }) => message, { critical: true })
    const successAlert = useAlert(({ message }) => message, { success: true })
    const { systemInfo } = useConfig()

    const [mutateEmailVerification, { loading: mutationLoading }] =
        useDataMutation(sendEmailVerificationMutation, {
            onComplete: () => {
                successAlert.show({
                    message: i18n.t(
                        'Email verification link sent successfully!'
                    ),
                })
            },
            onError: (err) => {
                errorAlert.show({
                    message:
                        err.message ||
                        i18n.t('Failed to send email verification link.'),
                })
            },
        })

    const emailConfigured = systemInfo?.emailConfigured

    if (!emailConfigured) {
        return null // If emailConfigured is false, don't display the button
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
                secondary
                onClick={mutateEmailVerification}
                disabled={mutationLoading || !userEmail}
                loading={mutationLoading}
            >
                {i18n.t('Verify Email')}
            </Button>
        </div>
    )
}

VerifyEmail.propTypes = {
    userEmail: PropTypes.string.isRequired,
}
