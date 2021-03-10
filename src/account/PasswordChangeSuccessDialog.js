import { FlatButton, Dialog } from 'material-ui'
import React from 'react'
import appActions from '../app.actions'
import i18n from '../locales'

// In development environments this won't provide the correct behavior
// because the app is hosted on a different port, but once an app is deployed
// reloading the window with an invalidated session will redirect to the login page
const reload = () => {
    appActions.setCategory('account')
    window.location.reload(true)
}

function PasswordChangeSuccessDialog() {
    const titleText = i18n.t('Password changed successfully')
    const bodyText = i18n.t(
        'You need to login again to continue using the application.'
    )
    const buttonText = i18n.t('Login')

    const buttons = [
        <FlatButton
            label={buttonText}
            primary
            onClick={reload}
            key={buttonText}
        />,
    ]
    return (
        <Dialog title={titleText} actions={buttons} modal open>
            {bodyText}
        </Dialog>
    )
}

export default PasswordChangeSuccessDialog
