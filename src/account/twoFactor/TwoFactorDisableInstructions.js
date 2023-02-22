import i18n from '@dhis2/d2-i18n'
import React from 'react'

const TwoFactorDisableInstructions = () => (
    <p>
        {i18n.t(
            'To disable 2 Factor Authentication for your account, first enter the confirmation code from the Authenticator App and then click "Disable".'
        )}
    </p>
)

export default TwoFactorDisableInstructions
