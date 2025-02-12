import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import TwoFactorEmailCodeButton from './TwoFactorEmailCodeButton.js'
import styles from './TwoFactorEnableInstructions.module.css'

const enroll2FAViaEmailMutationDefinition = {
    type: 'create',
    resource: '/2fa/disable ',
    data: {},
}
const TwoFactorEmailDisableInstructions = () => {
    const [turnOff2FAViaEmail, turnOff2FAViaEmailMutation] = useDataMutation(
        enroll2FAViaEmailMutationDefinition
    )

    return (
        <>
            <p className={styles.instructionsHeader}>
                {i18n.t('Turn off two-factor authentication via email', {
                    keySeparator: '<|>',
                })}
            </p>
            <ol className={styles.orderedList}>
                <li>
                    <TwoFactorEmailCodeButton
                        onClick={turnOff2FAViaEmail}
                        mutation={turnOff2FAViaEmailMutation}
                    />
                </li>
                <li>
                    <span>{i18n.t('Open your email to get the code')}</span>
                </li>
                <li>
                    {i18n.t(
                        'Now, enter the code from your email below and click the "Turn off" button.'
                    )}
                </li>
            </ol>
        </>
    )
}

export default TwoFactorEmailDisableInstructions
