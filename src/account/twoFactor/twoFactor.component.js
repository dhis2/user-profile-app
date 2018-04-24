import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, Paper, FlatButton, RaisedButton, Dialog } from 'material-ui';

import profileSettingsStore from '../../profile/profile.store';
import accountActions from '../account.actions';


const styles = {
    header: {
        fontSize: 24,
        fontWeight: 300,
        padding: '24px 0 12px 16px',
    },
    card: {
        marginTop: 8,
        marginRight: '1rem',
        padding: '0 1rem',
    },
    status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusButton: {
        margin: '1rem',
    },
    statusMessage: {
        margin: '1rem',
    },
};

const status = state => state ? 'ON' : 'OFF';

class TwoFactor extends Component {
    state = {
        canRender: false,
        isTwoFactorOn: false,
        dialogOpened: false,
    };

    async componentWillMount() {
        const status = await profileSettingsStore.state.twoFA;
        this.setState({
            isTwoFactorOn: status,
            canRender: true,
        })
    }

    closeSetupDialog = () => this.setState({ dialogOpened: false });

    openSetupDialog = () => this.setState({ dialogOpened: true });

    changeTwoFactorStatus = () => {
        this.setState({ 
            isTwoFactorOn: !this.state.isTwoFactorOn 
        }, () => {
            accountActions.setTwoFactorStatus(this.state.isTwoFactorOn);
        });
    }

    handleDialogAnswer = () => {
        this.changeTwoFactorStatus();
        this.closeSetupDialog();
    };

    render() {
        const Status2FA = () => (
            <Paper style={styles.status}>
                <div style={styles.statusMessage}>
                    {`2-Step Verification is ${status(this.state.isTwoFactorOn)}.`}
                </div>
                <RaisedButton
                    style={styles.statusButton}
                    label={`Turn ${status(!this.state.isTwoFactorOn)}`}
                    onClick={this.openSetupDialog}
                    primary
                />
            </Paper>
        );

        const SetupDialog = () => {
            const buttons = [
                <FlatButton
                    label="No"
                    primary={true}
                    onClick={this.closeSetupDialog}
                />,
                <FlatButton
                    label="Yes"
                    primary={true}
                    onClick={this.handleDialogAnswer}
                />,
            ];
            return (
                <Dialog
                    title={`Do you want to turn ${status(!this.state.isTwoFactorOn)} 2 factor?`}
                    actions={buttons}
                    modal={true}
                    open={this.state.dialogOpened}
                />
            );
        }
        


        return (
            <div className="content-area">
                <div style={styles.header}>2 Factor</div>
                {this.state.canRender &&
                <div>
                    <Status2FA />                
                    <SetupDialog />
                </div>}
            </div>
        );
    }
}

TwoFactor.contextTypes = { d2: PropTypes.object.isRequired };

export default TwoFactor;
