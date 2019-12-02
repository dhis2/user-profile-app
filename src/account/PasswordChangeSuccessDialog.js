import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Dialog } from 'material-ui';
import TextField from 'd2-ui/lib/form-fields/TextField';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';

import accountActions from './account.actions';
import isValidPassword from './isValidPassword';

class PasswordChangeSuccessDialog extends Component {
    state = {
        password: ''
    }
    formBuilder = null

    setPassword = (_, password) => {
        this.setState({ password })
    }

    setRef = node => {
        this.formBuilder = node;
    }

    login = () => {
        accountActions.login({
            username: this.context.d2.currentUser.username,
            password: this.state.password
        })
    }
    
    render() {
        const titleText = this.context.d2.i18n.getTranslation('password_changed_successfully');
        const bodyText = this.context.d2.i18n.getTranslation('login_again');
        const buttonText = this.context.d2.i18n.getTranslation('login');

        const fields = [
            {
                name: 'username',
                component: TextField,
                value: this.context.d2.currentUser.username,
                props: {
                    floatingLabelText: this.context.d2.i18n.getTranslation('username'),
                    style: { width: '100%' },
                    disabled: true,
                },
            },
            {
                name: 'password',
                component: TextField,
                value: this.state.password,
                props: {
                    type: 'password',
                    floatingLabelText: this.context.d2.i18n.getTranslation('password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                    autoComplete: 'new-password',
                },
                validators: [{
                    validator: isValidPassword,
                    message: this.context.d2.i18n.getTranslation(isValidPassword.message),
                }],
            },
        ]

        const isValid = !!(this.formBuilder && this.formBuilder.state.form.valid && this.state.password);

        const buttons = [
            <FlatButton
                label={buttonText} 
                primary onClick={this.login} 
                disabled={!isValid}
            />,
        ];

        return (
            <Dialog
                title={titleText}
                actions={buttons}
                modal
                open
            >
                <p>{bodyText}</p>
                <FormBuilder 
                    fields={fields} 
                    onUpdateField={this.setPassword} 
                    ref={this.setRef} 
                />
            </Dialog>
        );
    }
}

PasswordChangeSuccessDialog.contextTypes = { 
    d2: PropTypes.object.isRequired
};

export default PasswordChangeSuccessDialog;