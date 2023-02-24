import i18n from '@dhis2/d2-i18n'
import { IconQuestion16 } from '@dhis2/ui'
import React from 'react'
import styles from './TwoFactorEnableNotice.module.css'

const TwoFactorEnableNotice = () => (
    <div className={styles.enableNoticeContainer}>
        <p className={styles.enableNoticeTitle}>
            <IconQuestion16 />
            {i18n.t('Already set up two-factor authentication before?')}
        </p>
        <p className={styles.enableNoticeBody}>
            {i18n.t(
                'If you have set up two-factor authentication for this account before, you need to remove that entry from your authenticator app before setting it up again.'
            )}
        </p>
    </div>
)

export default TwoFactorEnableNotice
