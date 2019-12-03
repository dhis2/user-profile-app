import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Dialog } from 'material-ui';

import appActions from '../app.actions';

// In development environments this won't provide the correct behavior
// because the app is hosted on a different port, but once an app is deployed
// reloading the window with an invalidated session will redirect to the login page
const reload = () => {
    appActions.setCategory('account')
    window.location.reload(true);
}

function PasswordChangeSuccessDialog(props, context) {
    const titleText = context.d2.i18n.getTranslation('password_changed_successfully');
    const bodyText = context.d2.i18n.getTranslation('login_again');
    const buttonText = context.d2.i18n.getTranslation('login');

    const buttons = [
        <FlatButton label={buttonText} primary onClick={reload} />,
    ];
    return (
        <Dialog
            title={titleText}
            actions={buttons}
            modal
            open
        >
            {bodyText}
        </Dialog>
    );
}

PasswordChangeSuccessDialog.contextTypes = { 
    d2: PropTypes.object.isRequired
};

export default PasswordChangeSuccessDialog;