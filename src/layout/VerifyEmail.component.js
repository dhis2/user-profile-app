import { useAlert } from '@dhis2/app-runtime'
import { getInstance as getD2 } from 'd2'
import { blue400 } from 'material-ui/styles/colors.js'
import React from 'react'

export function VerifyEmail() {
    const errorAlert = useAlert(({ message }) => message, { critical: true })
    const successAlert = useAlert(({ message }) => message, { success: true })

    const handleEmailVerification = async () => {
        try {
            const d2 = await getD2()
            const api = d2.Api.getApi()
            api.baseUrl = 'http://localhost:8080/'

            const res = await api.post('account/sendEmailVerification')
            console.log('Response:', res)
            successAlert.show({
                message: 'Email verification link sent successfully!',
            })
        } catch (err) {
            console.error('Error:', err)
            errorAlert.show({
                message:
                    err.message || 'Failed to send email verification link.',
            })
        }
    }

    return (
        <button
            type="button"
            style={{
                marginTop: '10px',
                background: 'white',
                border: '1px solid',
                borderColor: blue400,
                color: blue400,
                padding: '10px',
                cursor: 'pointer',
            }}
            onClick={handleEmailVerification}
        >
            Verify Email
        </button>
    )
}
