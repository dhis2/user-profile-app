import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import TwoFactorEmailCodeButton from './TwoFactorEmailCodeButton.jsx'
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
            <ol className={styles.orderedList}>
                <li>
                    <TwoFactorEmailCodeButton
                        onClick={enroll2FAViaEmail}
                        error={enroll2FAViaEmailMutation.error?.message}
                        loading={enroll2FAViaEmailMutation.loading}
                        success={enroll2FAViaEmailMutation.data}
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

export default TwoFactorEmailEnableInstructions
