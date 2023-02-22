import i18n from '@dhis2/d2-i18n'
import { Card } from '@dhis2/ui'
import cx from 'classnames'
import React, { useState, useEffect } from 'react'
import profileSettingsStore from '../../profile/profile.store.js'
import styles from './TwoFactor.module.css'
import TwoFactorDisableInstructions from './TwoFactorDisableInstructions.js'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.js'
import TwoFactorEnableInstructions from './TwoFactorEnableInstructions.js'
import TwoFactorEnableNoticeBox from './TwoFactorEnableNoticeBox.js'
import TwoFactorStatus from './TwoFactorStatus.js'
import TwoFactorToggler from './TwoFactorToggler.js'
import useTwoFaToggleMutation from './useTwoFaToggleMutation.js'

const TwoFactor = () => {
    const [isTwoFactorOn, setIsTwoFactorOn] = useState(
        profileSettingsStore.state.twoFaEnabled
    )
    const { toggleTwoFa, loading, error, lastActionWasTwoFaDisableSuccess } =
        useTwoFaToggleMutation({
            isTwoFactorOn,
        })

    useEffect(() => {
        const subscription = profileSettingsStore.subscribe(
            ({ twoFaEnabled }) => {
                setIsTwoFactorOn(twoFaEnabled)
            }
        )
        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className={cx('content-area', styles.container)}>
            <div className={styles.header}>
                {i18n.t('2 Factor Authentication')}
            </div>
            <Card className={styles.card}>
                <TwoFactorStatus isTwoFactorOn={isTwoFactorOn} />
                {lastActionWasTwoFaDisableSuccess && (
                    <TwoFactorDisableNoticeBox />
                )}
                {isTwoFactorOn ? (
                    <TwoFactorDisableInstructions />
                ) : (
                    <TwoFactorEnableInstructions />
                )}
                <TwoFactorToggler
                    isTwoFactorOn={isTwoFactorOn}
                    toggleTwoFa={toggleTwoFa}
                    error={error}
                    loading={loading}
                />
                {!isTwoFactorOn && !lastActionWasTwoFaDisableSuccess && (
                    <TwoFactorEnableNoticeBox />
                )}
            </Card>
        </div>
    )
}

export default TwoFactor
