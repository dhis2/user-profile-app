import { useAlert } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
import { getInstance as getD2 } from 'd2'
import React, { useState } from 'react'

export function VerifyEmail() {
    const errorAlert = useAlert(({ message }) => message, { critical: true })
    const successAlert = useAlert(({ message }) => message, { success: true })
    const [isLoading, setIsLoading] = useState(false)

    const handleEmailVerification = async () => {
        setIsLoading(true)
        try {
            const d2 = await getD2()
            const api = d2.Api.getApi()
            api.baseUrl = 'http://localhost:8080/'

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
            <button
                type="button"
                style={{
                    background: 'white',
                    border: '1px solid',
                    borderColor: '#1976D2',
                    color: '#1976D2',
                    padding: '10px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
                onClick={handleEmailVerification}
                disabled={isLoading}
            >
                Verify Email
            </button>
            {isLoading && <CircularLoader small />}
        </div>
    )
}
