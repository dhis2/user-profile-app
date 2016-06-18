import React from 'react';
import log from 'loglevel';

import userSettingsActions from './userSettingsActions';

import { isValidPassword } from 'd2-ui/lib/forms/Validators';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import TextField from 'd2-ui/lib/form-fields/TextField';

import RaisedButton from 'material-ui/lib/raised-button';

import AppTheme from './theme';

class AccountEditor extends React.Component {
    constructor(props,context){
        super(props);
        this.state = Object.assign({},{
            newPassword: '',
            reNewPassword: '',
        });
        this.props = props;
        this.d2 = this.props.d2;
        this.updatePassword = this.updatePassword.bind(this);
        this.updateState = this.updateState.bind(this);
        this.isSamePassword = this.isSamePassword.bind(this);
        this.message = 'password_no_match';
    }

    isSamePassword(value) {
        return value === this.state.newPassword;
    }

    updatePassword(e) {
        if(this.state.newPassword != this.state.reNewPassword) {
            userSettingsActions.showSnackbarMessage(this.d2.i18n.getTranslation('password_no_match'));
        } else {
            let data = [];
            data.push('newPassword');
            data.push(this.state.newPassword);
            userSettingsActions.saveProfile(data);
        }
    }

    updateState(e,v) {
        this.setState({[e]: v});
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
                }
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
                validators: [
                    {
                        validator: isValidPassword,
                        message: this.d2.i18n.getTranslation(isValidPassword.message),
                    },
                ],
            },
            {
                name: 'reNewPassword',
                component: TextField,
                value: this.state.reNewPassword,
                props: {
                    type: 'password',
                    floatingLabelText: this.d2.i18n.getTranslation('retype_new_password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                },
                validators: [
                    {
                        validator: this.isSamePassword,
                        message: this.d2.i18n.getTranslation(this.message),
                    },
                ],
            },
            {
                name: 'postbutton',
                component: RaisedButton,
                props: { 
                    label: this.d2.i18n.getTranslation('post_new_password'),
                    onClick: this.updatePassword,
                    style: { marginTop: '20px' }
                }
            }

        ]
        
        return (
            <div>
                <FormBuilder fields={fields}  onUpdateField={this.updateState} />
            </div>
        );
    }
}

AccountEditor.propTypes = { d2: React.PropTypes.object };

export default AccountEditor;
