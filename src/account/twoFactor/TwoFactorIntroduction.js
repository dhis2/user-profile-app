import i18n from '@dhis2/d2-i18n'
import React from 'react'
import styles from './TwoFactorIntroduction.module.css'

const TwoFactorIntroduction = () => (
    <p className={styles.introductionText}>
        {i18n.t(
            'Two-factor authentication protects your account with an extra layer of security. With two-factor authentication turned on, you will need to enter an authentication code from your device every time you log in.'
        )}
    </p>
)

export default TwoFactorIntroduction
