import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'
import styles from './TwoFactorDisableNoticeBox.module.css'

const TwoFactorDisableNoticeBox = () => (
    <NoticeBox
        className={styles.container}
        info
        title={i18n.t('Instructions after disabling 2FA')}
    >
        {i18n.t(
            "After disabling 2-factor authentication on your account we recommend to also remove the account from the Authenticator App on your phone/tablet, so you don't run into problems if you want to re-enable it in the future."
        )}
    </NoticeBox>
)

export default TwoFactorDisableNoticeBox
