import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, IconCheckmark24, IconErrorFilled24 } from '@dhis2/ui'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'

const enroll2FAViaEmailMutationDefinition = {
    type: 'create',
    resource: '/2fa/disable ',
    data: undefined,
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
                    <span className={styles.stepWithAction}>
                        {i18n.t('Send a code to your email')}
                        <span className={styles.buttonWithIcon}>
                            <Button
                                onClick={turnOff2FAViaEmail}
                                secondary
                                loading={turnOff2FAViaEmailMutation.loading}
                            >
                                Send code
                            </Button>
                            {turnOff2FAViaEmailMutation.error && (
                                <IconErrorFilled24 color={'#d3302f'} />
                            )}
                            {turnOff2FAViaEmailMutation.data && (
                                <IconCheckmark24 color={'#f0f8ff'} />
                            )}
                        </span>
                        {turnOff2FAViaEmailMutation.error && (
                            <p className={styles.errorMessage}>
                                {turnOff2FAViaEmailMutation.error?.message}
                            </p>
                        )}
                    </span>
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
