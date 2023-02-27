import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './TwoFactorStatus.module.css'

const TwoFactorStatus = ({ isTwoFaEnabled }) => (
    <div className={styles.statusHeader}>
        {isTwoFaEnabled ? (
            <NoticeBox valid>
                {i18n.t('Two-factor authentication is on.', {
                    keySeparator: '<|>',
                })}
            </NoticeBox>
        ) : (
            <NoticeBox>
                {i18n.t('Two-factor authentication is off.', {
                    keySeparator: '<|>',
                })}
            </NoticeBox>
        )}
    </div>
)

TwoFactorStatus.propTypes = {
    isTwoFaEnabled: PropTypes.bool.isRequired,
}

export default TwoFactorStatus
