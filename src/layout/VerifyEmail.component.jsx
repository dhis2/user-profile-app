import { useAlert, useDataMutation, useConfig } from '@dhis2/app-runtime'
import { Button, email as emailValidator } from '@dhis2/ui'
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

    const isInvalidEmail = Boolean(emailValidator(userEmail))

    if (!emailConfigured) {
        return null
    }

    return (
        <Button
            secondary
            onClick={mutateEmailVerification}
            disabled={mutationLoading || isInvalidEmail || !userEmail}
            loading={mutationLoading}
        >
            {i18n.t('Verify email')}
        </Button>
    )
}

VerifyEmail.propTypes = {
    userEmail: PropTypes.string.isRequired,
}
