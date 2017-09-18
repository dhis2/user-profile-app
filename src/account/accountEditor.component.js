import React from 'react';
import PropTypes from 'prop-types';

import { isValidPassword } from 'd2-ui/lib/forms/Validators';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import TextField from 'd2-ui/lib/form-fields/TextField';

import RaisedButton from 'material-ui/RaisedButton';

import appActions from '../app.actions';
import accountActions from './account.actions';

function isNotEmpty(value) {
    return value && String(value).trim().length > 0;
}


class AccountEditor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = Object.assign({}, {
            newPassword: '',
            reNewPassword: '',
            wrongOldPasswordText: '',
        });

        this.d2 = this.context.d2;
        this.getTranslation = this.d2.i18n.getTranslation.bind(this.d2.i18n);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateState = this.updateState.bind(this);
        this.isSamePassword = this.isSamePassword.bind(this);
        this.isVerifiedPassword = this.isVerifiedPassword.bind(this);
        this.isVerifiedPassword.message = 'wrong_old_password';
        this.clearRepeatPassword = this.clearRepeatPassword.bind(this);
    }

    isSamePassword(value) {
        return value === this.state.newPassword;
    }

    isVerifiedPassword(value) {
        const api = this.d2.Api.getApi();
        return new Promise((resolve, reject) => {
            api.post('me/verifyPassword', { password: value })
                .then((res) => {
                    if (res.isCorrectPassword === true) {
                        resolve();
                    } else {
                        reject(this.d2.i18n.getTranslation('please_enter_the_correct_password'));
                    }
                });
        });
    }

    clearRepeatPassword() {
        this.setState({ reNewPassword: '' });
        return true;
    }

    /* eslint-disable */
    updatePassword() {
        const formState = this.formBuilder ? this.formBuilder.state.form : {};

        if (formState.pristine === true || !isNotEmpty(this.state.oldPassword)) {
            appActions.showSnackbarMessage(this.getTranslation('no_changes_have_been_made'));
        } else if (formState.validating === true) {
            appActions.showSnackbarMessage(this.getTranslation('validating_please_try_again'));
        } else if (formState.valid !== true) {
            appActions.showSnackbarMessage(this.getTranslation('fix_errors_and_try_again'));
        } else if (!isNotEmpty(this.state.newPassword) || !isNotEmpty(this.state.reNewPassword)) {
            appActions.showSnackbarMessage(this.getTranslation('password_do_not_match'));
        } else {
            accountActions.setPassword(this.state.newPassword);
        }
    }
    /* eslint-enable */

    updateState(e, v) {
        this.setState({ [e]: v });
    }

    render() {
        const fields = [
            {
                name: 'username',
                component: TextField,
                value: this.props.username,
                props: {
                    floatingLabelText: this.d2.i18n.getTranslation('username'),
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
                    floatingLabelText: this.d2.i18n.getTranslation('old_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [{
                    validator: isNotEmpty,
                    message: '',
                }],
                asyncValidators: [ this.isVerifiedPassword ],
            },
            {
                name: 'newPassword',
                component: TextField,
                value: this.state.newPassword,
                props: {
                    type: 'password',
                    floatingLabelText: this.d2.i18n.getTranslation('new_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [{
                    validator: isValidPassword,
                    message: this.d2.i18n.getTranslation(isValidPassword.message),
                }, {
                    // If a new valid password is entered, this "validator" clears out the "re-enter password" field below
                    validator: this.clearRepeatPassword,
                    message: '',
                }],
            },
            {
                name: 'reNewPassword',
                component: TextField,
                value: this.state.reNewPassword,
                props: {
                    type: 'password',
                    floatingLabelText: this.d2.i18n.getTranslation('repeat_new_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [{
                    validator: this.isSamePassword,
                    message: this.d2.i18n.getTranslation('passwords_do_not_match'),
                }],
            },
            {
                name: 'postbutton',
                component: RaisedButton,
                props: {
                    label: this.d2.i18n.getTranslation('update_password'),
                    onClick: this.updatePassword,
                    style: { marginTop: '20px' },
                },
            },
        ];

        const setRef = (r) => { this.formBuilder = r; };

        return <FormBuilder fields={fields} onUpdateField={this.updateState} ref={setRef} />;
    }
}
AccountEditor.propTypes = { username: PropTypes.string.isRequired };
AccountEditor.contextTypes = { d2: PropTypes.object.isRequired };

export default AccountEditor;
