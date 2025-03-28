import i18n from '@dhis2/d2-i18n'
import { Card } from '@dhis2/ui'
import cx from 'classnames'
import React from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.jsx'
import TwoFactorEnableNotice from './TwoFactorEnableNotice.jsx'
import TwoFactorIntroduction from './TwoFactorIntroduction.jsx'
import TwoFactorOTPDisableInstructions from './TwoFactorOTPDisableInstructions.jsx'
import TwoFactorOTPEnableInstructions from './TwoFactorOTPEnableInstructions.jsx'
import TwoFactorStatus from './TwoFactorStatus.jsx'
import TwoFactorToggler from './TwoFactorToggler.jsx'
import useTwoFaToggleMutation41AndLower from './useTwoFaToggleMutation41AndLower.js'

const TwoFactor41AndLower = () => {
    const {
        isTwoFaEnabled,
        toggleTwoFa,
        loading,
        error,
        lastActionWasTwoFaDisableSuccess,
    } = useTwoFaToggleMutation41AndLower()

    return (
        <div className={cx('content-area', styles.container)}>
            <div className={styles.header}>
                {i18n.t('Two-factor Authentication', { keySeparator: '<|>' })}
            </div>
            <Card className={styles.card}>
                <TwoFactorIntroduction />
                <TwoFactorStatus isTwoFaEnabled={isTwoFaEnabled} />
                {lastActionWasTwoFaDisableSuccess && (
                    <TwoFactorDisableNoticeBox />
                )}
                {isTwoFaEnabled ? (
                    <p className={styles.instructionsHeader}>
                        {i18n.t('Turn off two-factor authentication', {
                            keySeparator: '<|>',
                        })}
                    </p>
                ) : (
                    <p className={styles.instructionsHeader}>
                        {i18n.t('Turn on two-factor authentication', {
                            keySeparator: '<|>',
                        })}
                    </p>
                )}
                {isTwoFaEnabled ? (
                    <TwoFactorOTPDisableInstructions />
                ) : (
                    <TwoFactorOTPEnableInstructions />
                )}
                <TwoFactorToggler
                    isTwoFaEnabled={isTwoFaEnabled}
                    toggleTwoFa={toggleTwoFa}
                    error={error}
                    loading={loading}
                />
                {!isTwoFaEnabled && !lastActionWasTwoFaDisableSuccess && (
                    <TwoFactorEnableNotice />
                )}
            </Card>
        </div>
    )
}

export default TwoFactor41AndLower
