import i18n from '@dhis2/d2-i18n'
import { Card } from '@dhis2/ui'
import cx from 'classnames'
import React from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorDisableInstructions from './TwoFactorDisableInstructions.js'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.js'
import TwoFactorEnableInstructions from './TwoFactorEnableInstructions.js'
import TwoFactorEnableNoticeBox from './TwoFactorEnableNoticeBox.js'
import TwoFactorStatus from './TwoFactorStatus.js'
import TwoFactorToggler from './TwoFactorToggler.js'
import useTwoFaToggleMutation from './useTwoFaToggleMutation.js'

const TwoFactor = () => {
    const {
        isTwoFaEnabled,
        toggleTwoFa,
        loading,
        error,
        lastActionWasTwoFaDisableSuccess,
    } = useTwoFaToggleMutation()

    return (
        <div className={cx('content-area', styles.container)}>
            <div className={styles.header}>
                {i18n.t('2 Factor Authentication')}
            </div>
            <Card className={styles.card}>
                <TwoFactorStatus isTwoFaEnabled={isTwoFaEnabled} />
                {lastActionWasTwoFaDisableSuccess && (
                    <TwoFactorDisableNoticeBox />
                )}
                {isTwoFaEnabled ? (
                    <TwoFactorDisableInstructions />
                ) : (
                    <TwoFactorEnableInstructions />
                )}
                <TwoFactorToggler
                    isTwoFaEnabled={isTwoFaEnabled}
                    toggleTwoFa={toggleTwoFa}
                    error={error}
                    loading={loading}
                />
                {!isTwoFaEnabled && !lastActionWasTwoFaDisableSuccess && (
                    <TwoFactorEnableNoticeBox />
                )}
            </Card>
        </div>
    )
}

export default TwoFactor
