import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import styles from './TwoFactor.module.css'
import TwoFactorEmailDisableInstructions from './TwoFactorEmailDisableInstructions.jsx'
import TwoFactorEmailEnableInstructions from './TwoFactorEmailEnableInstructions.jsx'
import TwoFactorOTPDisableInstructions from './TwoFactorOTPDisableInstructions.jsx'
import TwoFactorOTPEnableInstructions from './TwoFactorOTPEnableInstructions.jsx'
import { twoFactorAuthTypes } from './useTwoFaToggleMutation.js'

const TwoFactorInstructions = ({
    isTwoFaEnabled,
    twoFactorAuthToToShow,
    toggleEmail2faForbidden,
}) => {
    if (toggleEmail2faForbidden) {
        return (
            <NoticeBox warning className={styles.emailVerificationWarning}>
                {i18n.t(
                    'Your email is not verified. You must verify or your email to enable or disable two-factor authentication via email. If you have recently verified your email, you may need to refresh this page.'
                )}
                <br />
                <Link to="/profile">{i18n.t('Verify your email here.')}</Link>
            </NoticeBox>
        )
    }
    return (
        <>
            {twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                !isTwoFaEnabled && <TwoFactorOTPEnableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                isTwoFaEnabled && <TwoFactorOTPDisableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.email &&
                !isTwoFaEnabled && <TwoFactorEmailEnableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.email &&
                isTwoFaEnabled && <TwoFactorEmailDisableInstructions />}
        </>
    )
}

TwoFactorInstructions.propTypes = {
    isTwoFaEnabled: PropTypes.bool.isRequired,
    toggleEmail2faForbidden: PropTypes.bool.isRequired,
    twoFactorAuthToToShow: PropTypes.string,
}

export default TwoFactorInstructions
