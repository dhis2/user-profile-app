import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import TwoFactorEmailCodeButton from './TwoFactorEmailCodeButton.jsx'
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
            <ol className={styles.orderedList}>
                <li>
                    <TwoFactorEmailCodeButton
                        onClick={turnOff2FAViaEmail}
                        loading={turnOff2FAViaEmailMutation.loading}
                        success={
                            turnOff2FAViaEmailMutation.error &&
                            turnOff2FAViaEmailMutation.error.details
                                ?.httpStatusCode === 409
                        }
                        error={
                            turnOff2FAViaEmailMutation.error?.details
                                ?.httpStatusCode !== 409 &&
                            turnOff2FAViaEmailMutation.error?.message
                        }
                    />
                </li>
                <li>
                    {i18n.t(
                        'Enter the 6 digit authentication code in the email.'
                    )}
                </li>
            </ol>
        </>
    )
}

export default TwoFactorEmailDisableInstructions
