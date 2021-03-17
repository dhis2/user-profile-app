import React, { Component } from 'react'
import i18n from '../../locales'
import profileSettingsStore from '../../profile/profile.store'
import accountActions from '../account.actions'
import QRCode from './QRCode'
import SetupGuide from './setup-guide/SetupGuide.component'
import Status2FA from './Status2FA'
import Status2FAChangeDialog from './Status2FAChangeDialog'

const styles = {
    header: {
        fontSize: 24,
        fontWeight: 300,
        padding: '24px 0 12px 16px',
    },
}

class TwoFactor extends Component {
    state = {
        canRender: false,
        isTwoFactorOn: false,
        dialogOpened: false,
    }

    componentDidMount() {
        const status = profileSettingsStore.state.twoFA
        this.setState({
            isTwoFactorOn: status,
            canRender: true,
        })
    }

    closeSetupDialog = () => this.setState({ dialogOpened: false })

    openSetupDialog = () => this.setState({ dialogOpened: true })

    changeTwoFactorStatus = () => {
        this.setState(
            {
                isTwoFactorOn: !this.state.isTwoFactorOn,
            },
            () => {
                accountActions.setTwoFactorStatus(this.state.isTwoFactorOn)
            }
        )
    }

    handleDialogAnswer = () => {
        this.changeTwoFactorStatus()
        this.closeSetupDialog()
    }

    render() {
        return (
            <div className="content-area">
                <div style={styles.header}>2 Factor</div>
                {this.state.canRender && (
                    <div>
                        <Status2FA
                            isTwoFactorOn={this.state.isTwoFactorOn}
                            openSetupDialog={this.openSetupDialog}
                            buttonLabel={
                                this.state.isTwoFactorOn
                                    ? i18n.t('Turn OFF')
                                    : i18n.t('Turn ON')
                            }
                            statusMessage={
                                this.state.isTwoFactorOn
                                    ? i18n.t('2-Factor Verification is ON')
                                    : i18n.t('2-Factor Verification is OFF')
                            }
                        />
                        <Status2FAChangeDialog
                            dialogTitle={
                                this.state.isTwoFactorOn
                                    ? i18n.t(
                                          'Do you want to turn OFF 2-Factor?'
                                      )
                                    : i18n.t('Do you want to turn ON 2-Factor?')
                            }
                            closeSetupDialog={this.closeSetupDialog}
                            handleDialogAnswer={this.handleDialogAnswer}
                            dialogOpened={this.state.dialogOpened}
                        />
                        <SetupGuide open={this.state.isTwoFactorOn} />
                        <QRCode open={this.state.isTwoFactorOn} />
                    </div>
                )}
            </div>
        )
    }
}

export default TwoFactor
