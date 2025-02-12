import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Button, IconCheckmark24, IconErrorFilled24 } from '@dhis2/ui'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'

const enroll2FAViaEmailMutationDefinition = {
    type: 'create',
    resource: '/2fa/enrollEmail2FA ',
    data: {},
}

const TwoFactorEmailEnableInstructions = () => {
    const [enroll2FAViaEmail, enroll2FAViaEmailMutation] = useDataMutation(
        enroll2FAViaEmailMutationDefinition
    )

    return (
        <>
            <p className={styles.instructionsHeader}>
                {i18n.t('Turn on two-factor authentication via email', {
                    keySeparator: '<|>',
                })}
            </p>
            <ol className={styles.orderedList}>
                <li>
                    <span className={styles.stepWithAction}>
                        {i18n.t('Send a code to your email')}
                        <span className={styles.buttonWithIcon}>
                            <Button
                                onClick={enroll2FAViaEmail}
                                secondary
                                loading={enroll2FAViaEmailMutation.loading}
                            >
                                Send code
                            </Button>
                            {enroll2FAViaEmailMutation.error && (
                                <IconErrorFilled24 color={'#d3302f'} />
                            )}
                            {enroll2FAViaEmailMutation.data && (
                                <IconCheckmark24 color={'#1a5e20'} />
                            )}
                        </span>
                        {enroll2FAViaEmailMutation.error && (
                            <p className={styles.errorMessage}>
                                {enroll2FAViaEmailMutation.error?.message}
                            </p>
                        )}
                    </span>
                </li>
                <li>
                    <span>{i18n.t('Open your email to get the code')}</span>
                </li>
                <li>
                    {i18n.t(
                        'Now, enter the code from your email below and click the "Turn on" button.'
                    )}
                </li>
            </ol>
        </>
    )
}

export default TwoFactorEmailEnableInstructions
