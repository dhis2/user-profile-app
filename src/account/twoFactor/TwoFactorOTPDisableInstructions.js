import i18n from '@dhis2/d2-i18n'
import React from 'react'
import styles from './TwoFactorDisableInstructions.module.css'

const TwoFactorOTPDisableInstructions = () => (
    <>
        <ol className={styles.orderedList}>
            <li>
                {i18n.t('Open your authenticator app.', {
                    keySeparator: '<|>',
                })}
            </li>
            <li>
                {i18n.t(
                    'Now, enter the authentication code below and click the "Turn off" button.'
                )}
            </li>
        </ol>
    </>
)

export default TwoFactorOTPDisableInstructions
