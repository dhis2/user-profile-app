import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SetupGuide from './setup-guide/SetupGuide.component';
import Status2FA from './Status2FA';
import TwoFaStatusChangeDialog from './TwoFaStatusChangeDialog';
import QRCode from './QRCode';

import profileSettingsStore from '../../profile/profile.store';
import accountActions from '../account.actions';

const styles = {
    header: {
        fontSize: 24,
        fontWeight: 300,
        padding: '24px 0 12px 16px',
    },
};

const status = state => state ? 'on' : 'off';

class TwoFactor extends Component {
    state = {
        canRender: false,
        isTwoFactorOn: false,
        dialogOpened: false,
    };

    componentWillMount() {
        const status = profileSettingsStore.state.twoFA;
        this.setState({
            isTwoFactorOn: status,
            canRender: true,
        })
    }
    
    translate = key => this.context.d2.i18n.getTranslation(key);

    closeSetupDialog = () => this.setState({ dialogOpened: false });

    openSetupDialog = () => this.setState({ dialogOpened: true });

    changeTwoFactorStatus = () => {
        this.setState({ 
            isTwoFactorOn: !this.state.isTwoFactorOn 
        }, () => {
            accountActions.setTwoFactorStatus(this.state.isTwoFactorOn);
        });
    }

    handleChangeStatus = () => {
        this.changeTwoFactorStatus();
        this.closeSetupDialog();
    };

    render() {        
        return (
            <div className="content-area">
                <div style={styles.header}>{this.translate('twoFA')}</div>
                {this.state.canRender &&
                <div>
                    <Status2FA
                        isTwoFactorOn={this.state.isTwoFactorOn}
                        openSetupDialog={this.openSetupDialog}
                        buttonLabel={this.translate(`turn_${status(!this.state.isTwoFactorOn)}`)}
                        statusMessage={this.translate(`twoFA_status_${status(this.state.isTwoFactorOn)}`)}
                    />
                    <TwoFaStatusChangeDialog
                        dialogTitle={this.translate(`twoFA_turn_${status(!this.state.isTwoFactorOn)}`)}
                        isTwoFactorOn={this.state.isTwoFactorOn}
                        closeSetupDialog={this.closeSetupDialog}
                        handleChangeStatus={this.handleChangeStatus}
                        dialogOpened={this.state.dialogOpened}
                    />
                    <SetupGuide />
                    <QRCode />
                </div>}
            </div>
        );
    }
}

TwoFactor.contextTypes = { d2: PropTypes.object.isRequired };

export default TwoFactor;
