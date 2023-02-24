import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import styles from './TwoFactorDisableNoticeBox.module.css'

const TwoFactorDisableNoticeBox = () => (
    <NoticeBox
        className={styles.container}
        warning
        title={i18n.t('Remove two-factor account')}
    >
        {i18n.t(
            'Two-factor authentication is now turned off. It is recommended to remove the account from your authenticator app now to prevent any future issues re-enabling two-factor authentication.'
        )}
    </NoticeBox>
)

export default TwoFactorDisableNoticeBox
