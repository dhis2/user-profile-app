import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorEmailDisableInstructions from './TwoFactorEmailDisableInstructions.js'
import TwoFactorEmailEnableInstructions from './TwoFactorEmailEnableInstructions.js'
import TwoFactorOPTEnableInstructions from './TwoFactorOPTEnableInstructions.js'
import TwoFactorOTPDisableInstructions from './TwoFactorOTPDisableInstructions.js'
import { twoFactorAuthTypes } from './useTwoFaToggleMutation.js'

const TwoFactorInstructions = ({
    is2faEnabled,
    twoFactorAuthToToShow,
    toggleEmail2faForbidden,
}) => {
    if (toggleEmail2faForbidden) {
        return (
            <NoticeBox warning className={styles.emailVerificationWarning}>
                {i18n.t(
                    'Your email is not verified. You must verify or your email to enable or disable two-factor authentication via email.'
                )}
                <br />
                <a href="#/profile">{i18n.t('Verify your email here.')}</a>
            </NoticeBox>
        )
    }
    return (
        <>
            {twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                !is2faEnabled && <TwoFactorOPTEnableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                is2faEnabled && <TwoFactorOTPDisableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.email &&
                !is2faEnabled && <TwoFactorEmailEnableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.email &&
                is2faEnabled && <TwoFactorEmailDisableInstructions />}
        </>
    )
}

TwoFactorInstructions.propTypes = {
    is2faEnabled: PropTypes.bool.isRequired,
    toggleEmail2faForbidden: PropTypes.bool.isRequired,
    twoFactorAuthToToShow: PropTypes.string,
}

export default TwoFactorInstructions
