import TextField from 'd2-ui/lib/form-fields/TextField'
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component'
import { FlatButton, RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import appActions from '../app.actions.js'
import i18n from '../locales/index.js'
import accountActions from './account.actions.js'

const styles = {
    notification: {
        border: '1px solid #bdbdbd',
        backgroundColor: '#e5e5e5',
        padding: 12,
    },
}

// from our frontend validator https://github.com/dhis2/ui/blob/master/collections/forms/src/validators/dhis2Password.js
const DEFAULT_MIN_PASSWORD_LENGTH = 8
const DEFAULT_MAX_PASSWORD_LENGTH = 72

class AccountEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
            wrongOldPasswordText: '',
        }
    }

    isSamePassword = (value) => {
        return value === this.state.newPassword
    }

    isNotEmpty = (value) => {
        return value && String(value).trim().length > 0
    }

    clearRepeatPassword = () => {
        this.setState({
            oldPassword: '',
            reNewPassword: '',
            newPassword: '',
        })
        return true
    }

    updatePassword = () => {
        const formState = this.formBuilder ? this.formBuilder.state.form : {}
        if (formState.pristine === true) {
            appActions.showSnackbarMessage({
                message: i18n.t('No changes have been made'),
            })
        } else if (formState.validating === true) {
            appActions.showSnackbarMessage({
                message: i18n.t(
                    'The form is currently being validated. Please try again.'
                ),
                status: 'warning',
            })
        } else if (formState.valid !== true) {
            appActions.showSnackbarMessage({
                message: i18n.t(
                    'The form contains errors. Please fix the errors and try again.'
                ),
                status: 'error',
            })
        } else if (
            !this.isNotEmpty(this.state.newPassword) ||
            !this.isNotEmpty(this.state.reNewPassword)
        ) {
            appActions.showSnackbarMessage({
                message: i18n.t(
                    'The entered values do not match. Please re-enter.'
                ),
                status: 'error',
            })
        } else if (!this.isNotEmpty(this.state.oldPassword)) {
            appActions.showSnackbarMessage({
                message: i18n.t('Please provide your old password'),
                status: 'error',
            })
        } else {
            accountActions.setPassword(
                this.state.oldPassword,
                this.state.newPassword,
                this.clearRepeatPassword
            )
        }
    }

    openTwoFactorDialog = () => {
        appActions.setCategory('twoFactor')
    }

    updateState = (e, v) => {
        this.setState({ [e]: v })
    }

    validatePassword = (val, regEx) => (!val ? true : regEx.test(val))

    render() {
        const usesOpenIdConnect = this.context.d2.currentUser.externalAuth
        const { minPasswordLength, maxPasswordLength } =
            this.context.d2.system.settings.settings

        const minLength = Number.isInteger(Number(minPasswordLength))
            ? Number(minPasswordLength)
            : DEFAULT_MIN_PASSWORD_LENGTH
        const maxLength = Number.isInteger(Number(maxPasswordLength))
            ? Number(maxPasswordLength)
            : DEFAULT_MAX_PASSWORD_LENGTH

        const passwordRegEx = new RegExp(
            `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])[A-Za-z\\d\\W_]{${minLength},${maxLength}}$`
        )

        const fields = [
            {
                name: 'username',
                component: TextField,
                value: this.props.username,
                props: {
                    floatingLabelText: i18n.t('Username'),
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
                    floatingLabelText: i18n.t('Old password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                    autoComplete: 'new-password',
                    disabled: usesOpenIdConnect,
                },
                validators: [
                    {
                        validator: this.isNotEmpty,
                        message: i18n.t("This field can't be left blank"),
                    },
                ],
            },
            {
                name: 'newPassword',
                component: TextField,
                value: this.state.newPassword,
                props: {
                    type: 'password',
                    floatingLabelText: i18n.t('New password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                    autoComplete: 'new-password',
                    disabled: usesOpenIdConnect,
                },
                validators: [
                    {
                        validator: (val) =>
                            this.validatePassword(val, passwordRegEx),
                        message: i18n.t(
                            'Password should be between {{minPasswordLength}} and {{maxPasswordLength}} characters long, with at least one lowercase character, one uppercase character, one number, and one special character.',
                            { minPasswordLength, maxPasswordLength }
                        ),
                    },
                ],
            },
            {
                name: 'reNewPassword',
                component: TextField,
                value: this.state.reNewPassword,
                props: {
                    type: 'password',
                    floatingLabelText: i18n.t('Repeat new password'),
                    style: { width: '100%' },
                    changeEvent: 'onBlur',
                    autoComplete: 'new-password',
                    disabled: usesOpenIdConnect,
                },
                validators: [
                    {
                        validator: this.isSamePassword,
                        message: i18n.t(
                            'The entered values do not match. Please re-enter.'
                        ),
                    },
                ],
            },
            {
                name: 'twoFactorSetupButton',
                component: FlatButton,
                props: {
                    label: i18n.t('Setup 2-Factor'),
                    onClick: this.openTwoFactorDialog,
                    style: { marginTop: '20px' },
                    secondary: false,
                    disabled: usesOpenIdConnect,
                },
            },
            {
                name: 'postbutton',
                component: RaisedButton,
                props: {
                    label: i18n.t('Update password'),
                    onClick: this.updatePassword,
                    style: { marginTop: '20px' },
                    secondary: true,
                    disabled: usesOpenIdConnect,
                },
            },
        ]

        const setRef = (r) => {
            this.formBuilder = r
        }

        return (
            <>
                {usesOpenIdConnect && (
                    <div style={styles.notification}>
                        {i18n.t(
                            "This account is linked to an OpenID Connect identity. Visit the Open ID Connect provider to manage this account's settings."
                        )}
                    </div>
                )}
                <FormBuilder
                    fields={fields}
                    onUpdateField={this.updateState}
                    ref={setRef}
                />
            </>
        )
    }
}
AccountEditor.propTypes = { username: PropTypes.string.isRequired }
AccountEditor.contextTypes = { d2: PropTypes.object.isRequired }

export default AccountEditor
