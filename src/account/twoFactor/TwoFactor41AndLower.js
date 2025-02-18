import i18n from '@dhis2/d2-i18n'
import { Card } from '@dhis2/ui'
import cx from 'classnames'
import React from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.js'
import TwoFactorEnableNotice from './TwoFactorEnableNotice.js'
import TwoFactorIntroduction from './TwoFactorIntroduction.js'
import TwoFactorOTPDisableInstructions from './TwoFactorOTPDisableInstructions.js'
import TwoFactorOTPEnableInstructions from './TwoFactorOTPEnableInstructions.js'
import TwoFactorStatus from './TwoFactorStatus.js'
import TwoFactorToggler from './TwoFactorToggler.js'
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
