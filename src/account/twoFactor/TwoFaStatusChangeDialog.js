import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Dialog, TextField } from 'material-ui';
import accountActions from '../account.actions';

class TwoFaStatusChangeDialog extends Component {
    constructor (props, context) {
        super(props);
        this.state = { code: '', errorText: '' };

        this.buttons = [
            <FlatButton
                label={context.d2.i18n.getTranslation('cancel')}
                primary
                onClick={this.closeDialog}
            />,
            <FlatButton
                label={context.d2.i18n.getTranslation(this.props.isTwoFactorOn ? 'disable' : 'enable')}
                primary
                onClick={this.checkAuthentication}
            />,
        ];  
    }

    closeDialog = () => {
        this.setState({ code: '', errorText: ''});
        this.props.closeSetupDialog();
    }

    setCode = ({ target}) => this.setState({ code: target.value });

    setErrorText = errorText => this.setState({ errorText });

    checkAuthentication = () => {
        accountActions.checkAuthCode(
            this.state.code,
            this.props.handleChangeStatus,
            this.setErrorText,
        );
    }

    render() {
        return (
            <Dialog
                title={this.props.dialogTitle}
                actions={this.buttons}
                modal
                open={this.props.dialogOpened}
            >
                <TextField hintText="Enter code" onChange={this.setCode} errorText={this.state.errorText} />
            </Dialog>
        );
    }
}

TwoFaStatusChangeDialog.propTypes = {
    isTwoFactorOn: PropTypes.bool.isRequired,
    closeSetupDialog: PropTypes.func.isRequired,
    handleChangeStatus: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogOpened: PropTypes.bool.isRequired,
};

TwoFaStatusChangeDialog.contextTypes = { d2: PropTypes.object.isRequired };

export default TwoFaStatusChangeDialog;
