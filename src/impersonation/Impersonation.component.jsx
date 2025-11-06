import { useDataMutation } from '@dhis2/app-runtime'
import { Button, Input, NoticeBox, CircularLoader } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import i18n from '../locales/index.js'
import userProfileStore from '../profile/profile.store.js'
import styles from './Impersonation.module.css'

const impersonateMutation = {
    resource: 'auth/impersonate',
    type: 'create',
    params: ({ username }) => ({ username }),
}

const exitImpersonationMutation = {
    resource: 'auth/impersonateExit',
    type: 'create',
}

function Impersonation(props) {
    const [username, setUsername] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [impersonate, { loading: impersonateLoading }] =
        useDataMutation(impersonateMutation)
    const [exitImpersonation, { loading: exitLoading }] = useDataMutation(
        exitImpersonationMutation
    )

    // Check if user is currently in impersonation mode
    // The 'impersonate' field contains the username of the original user when actively impersonating
    // This field only exists on the user object when impersonation is active
    const isImpersonating = !!userProfileStore.state.impersonate

    const handleImpersonate = async () => {
        if (!username.trim()) {
            setErrorMessage(i18n.t('Please enter a username'))
            setSuccessMessage('')
            return
        }

        setErrorMessage('')
        setSuccessMessage('')

        try {
            await impersonate({ username: username.trim() })
            setSuccessMessage(
                i18n.t('Successfully impersonating user: {{username}}', {
                    username: username.trim(),
                })
            )
            // Redirect to root page to reflect the impersonated user's profile
            setTimeout(() => {
                window.location.hash = '#/'
                window.location.reload()
            }, 1500)
        } catch (error) {
            console.error('Impersonate error:', error)
            const errorMsg = error?.message || error?.details?.message || error?.toString() ||
                    i18n.t('Failed to impersonate user. Please try again.')
            setErrorMessage(errorMsg)
        }
    }

    const handleExitImpersonation = async () => {
        setErrorMessage('')
        setSuccessMessage('')

        try {
            await exitImpersonation()
            setSuccessMessage(i18n.t('Successfully exited impersonation mode'))
            // Redirect to root page to reflect the original user's profile
            setTimeout(() => {
                window.location.hash = '#/'
                window.location.reload()
            }, 1500)
        } catch (error) {
            console.error('Exit impersonation error:', error)
            const errorMsg = error?.message || error?.details?.message || error?.toString() ||
                    i18n.t('Failed to exit impersonation mode. Please try again.')
            setErrorMessage(errorMsg)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !isImpersonating) {
            handleImpersonate()
        }
    }

    const loading = impersonateLoading || exitLoading

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>
                    {i18n.t('User impersonation')}
                </h2>

                {!isImpersonating && (
                    <NoticeBox warning title={i18n.t('Warning')}>
                        {i18n.t(
                            'You are about to impersonate another user. While impersonating, you will have the same access rights and permissions as that user. Please exercise caution and use this feature responsibly. All actions performed while impersonating will be attributed to the impersonated user.'
                        )}
                    </NoticeBox>
                )}

                {isImpersonating && (
                    <NoticeBox
                        info
                        title={i18n.t('Currently in impersonation mode')}
                    >
                        {i18n.t(
                            'You are currently impersonating another user. Click the button below to exit impersonation mode and return to your original account.'
                        )}
                    </NoticeBox>
                )}

                {successMessage && (
                    <NoticeBox success title={i18n.t('Success')}>
                        {successMessage}
                    </NoticeBox>
                )}

                {errorMessage && (
                    <NoticeBox error title={i18n.t('Error')}>
                        {errorMessage}
                    </NoticeBox>
                )}

                {!isImpersonating ? (
                    <div className={styles.form}>
                        <Input
                            label={i18n.t('Username')}
                            value={username}
                            onChange={({ value }) => setUsername(value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                            placeholder={i18n.t(
                                'Enter the username to impersonate'
                            )}
                            className={styles.input}
                        />
                        <Button
                            primary
                            onClick={handleImpersonate}
                            disabled={loading || !username.trim()}
                            icon={
                                loading ? (
                                    <CircularLoader small />
                                ) : undefined
                            }
                        >
                            {loading
                                ? i18n.t('Impersonating...')
                                : i18n.t('Impersonate user')}
                        </Button>
                    </div>
                ) : (
                    <div className={styles.form}>
                        <Button
                            primary
                            onClick={handleExitImpersonation}
                            disabled={loading}
                            icon={
                                loading ? (
                                    <CircularLoader small />
                                ) : undefined
                            }
                        >
                            {loading
                                ? i18n.t('Exiting...')
                                : i18n.t('Exit impersonation')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

Impersonation.contextTypes = {
    d2: PropTypes.object.isRequired,
}

export default Impersonation

