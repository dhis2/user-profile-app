import i18n from '@dhis2/d2-i18n'
import { Card } from '@dhis2/ui'
import cx from 'classnames'
import React from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.js'
import TwoFactorEnableNotice from './TwoFactorEnableNotice.js'
import TwoFactorIntroduction from './TwoFactorIntroduction.js'
import TwoFactorOPTEnableInstructions from './TwoFactorOPTEnableInstructions.js'
import TwoFactorOTPDisableInstructions from './TwoFactorOTPDisableInstructions.js'
import TwoFactorStatus from './TwoFactorStatus.js'
import TwoFactorToggler from './TwoFactorToggler.js'
import useTwoFaToggleMutationOld from './useTwoFaToggleMutationOld.js'

const TwoFactorOld = () => {
    const {
        isTwoFaEnabled,
        toggleTwoFa,
        loading,
        error,
        lastActionWasTwoFaDisableSuccess,
    } = useTwoFaToggleMutationOld()

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
                    <TwoFactorOPTEnableInstructions />
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

export default TwoFactorOld
