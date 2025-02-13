import i18n from '@dhis2/d2-i18n'
import { Button, IconCheckmark16, IconErrorFilled24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import userProfileStore from '../../profile/profile.store.js'
import styles from './TwoFactorEnableInstructions.module.css'

const TwoFactorEmailCodeButton = ({ onClick, error, loading, success }) => {
    const emailAddress = userProfileStore.state.email
    return (
        <span className={styles.stepWithAction}>
            {i18n.t(
                'Send authentication code to your verified email address: {{emailAddress}}',
                {
                    emailAddress: emailAddress,
                }
            )}
            {success ? (
                <span className={styles.successMessage}>
                    <IconCheckmark16 color={'#1a5e20'} />{' '}
                    {i18n.t('Authentication code sent')}
                </span>
            ) : (
                <>
                    <span className={styles.buttonWithIcon}>
                        <Button onClick={onClick} secondary loading={loading}>
                            {i18n.t('Send authentication code')}
                        </Button>
                        {error && <IconErrorFilled24 color={'#d3302f'} />}
                    </span>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </>
            )}
        </span>
    )
}

TwoFactorEmailCodeButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    success: PropTypes.bool,
}

export default TwoFactorEmailCodeButton
