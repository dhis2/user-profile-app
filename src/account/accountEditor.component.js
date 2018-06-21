import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isValidPassword } from 'd2-ui/lib/forms/Validators';

import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import TextField from 'd2-ui/lib/form-fields/TextField';
import { FlatButton, RaisedButton } from 'material-ui';

import appActions from '../app.actions';
import accountActions from './account.actions';


class AccountEditor extends Component {
    constructor (props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
            wrongOldPasswordText: '',
        };
        this.isVerifiedPassword.message = "wrong_old_password";
    }

    isSamePassword = (value) => {
        return value === this.state.newPassword;
    }

    isNotEmpty = (value) => {
        return value && String(value).trim().length > 0;
    }

    isVerifiedPassword = (value) => {
        const api = this.context.d2.Api.getApi();
        return new Promise((resolve, reject) => {
            api.post('/me/verifyPassword', { password: value })
                .then((res) => {
                    if (res.isCorrectPassword === true) {
                        resolve();
                    } else {
                        reject(this.context.d2.i18n.getTranslation('please_enter_the_correct_password'));
                    }
                });
        });
    }

    clearRepeatPassword = () => {
        this.setState(
            { 
                oldPassword: '',
                reNewPassword: '',
                newPassword: '',
            }
        );
        return true;
    }

    updatePassword = () => {
        const formState = this.formBuilder ? this.formBuilder.state.form : {};
        if (formState.pristine === true) {
            appActions.showSnackbarMessage({ message: this.context.d2.i18n.getTranslation('no_changes_have_been_made')});
        } else if (formState.validating === true) {
            appActions.showSnackbarMessage({ message: this.context.d2.i18n.getTranslation('validating_please_try_again'), status: 'warning' });
        } else if (formState.valid !== true) {
            appActions.showSnackbarMessage({ message: this.context.d2.i18n.getTranslation('fix_errors_and_try_again'), status:'error' });
        } else if (!this.isNotEmpty(this.state.newPassword) || !this.isNotEmpty(this.state.reNewPassword)) {
            appActions.showSnackbarMessage({ message: this.context.d2.i18n.getTranslation('password_do_not_match'), status:'error'});
        } else {
            accountActions.setPassword(this.state.newPassword, this.clearRepeatPassword);
        }
    }

    openTwoFactorDialog = () => {
        appActions.setCategory('twoFactor');
    }

    updateState = (e, v) => {
        this.setState({ [e]: v });
    }

    render() {
        const fields = [
            {
                name: 'username',
                component: TextField,
                value: this.props.username,
                props: {
                    floatingLabelText: this.context.d2.i18n.getTranslation('username'),
                    style: { width: '100%' },
                    disabled: true,
                },
            },
            {
                name: 'oldPassword',
                component: TextField,
                value: this.state.oldPassword,
                props: {
                    type: 'password',
                    floatingLabelText: this.context.d2.i18n.getTranslation('old_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [{
                    validator: this.isNotEmpty,
                    message: '',
                }],
                asyncValidators: [this.isVerifiedPassword],
            },
            {
                name: 'newPassword',
                component: TextField,
                value: this.state.newPassword,
                props: {
                    type: 'password',
                    floatingLabelText: this.context.d2.i18n.getTranslation('new_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [{
                    validator: isValidPassword,
                    message: this.context.d2.i18n.getTranslation(isValidPassword.message),
                }],
            },
            {
                name: 'reNewPassword',
                component: TextField,
                value: this.state.reNewPassword,
                props: {
                    type: 'password',
                    floatingLabelText: this.context.d2.i18n.getTranslation('repeat_new_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [{
                    validator: this.isSamePassword,
                    message: this.context.d2.i18n.getTranslation('passwords_do_not_match'),
                }],
            },
            {
                name: 'twoFactorSetupButton',
                component: FlatButton,
                props: {
                    label: this.context.d2.i18n.getTranslation('setup_two_factor'),
                    onClick: this.openTwoFactorDialog,
                    style: { marginTop: '20px' },
                    secondary: false,
                },
            },
            {
                name: 'postbutton',
                component: RaisedButton,
                props: {
                    label: this.context.d2.i18n.getTranslation('update_password'),
                    onClick: this.updatePassword,
                    style: { marginTop: '20px' },
                    secondary: true,
                },
            },
        ];
        const setRef = (r) => { this.formBuilder = r; };

        return <FormBuilder 
                    fields={fields} 
                    onUpdateField={this.updateState} 
                    ref={setRef} 
                />;
    }
}
AccountEditor.propTypes = { username: PropTypes.string.isRequired };
AccountEditor.contextTypes = { d2: PropTypes.object.isRequired };

export default AccountEditor;
