import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from '../../../locales/index.js'
import DownloadGuide from './DownloadGuide.js'
import phoneTypes from './phoneTypes.js'

const styles = {
    guideHeader: {
        fontWeight: 300,
        padding: '24px 16px 24px 16px',
    },
}

class SetupGuide extends Component {
    state = {
        phoneType: phoneTypes.DEFAULT,
    }

    setPhoneType = (event, value) => this.setState({ phoneType: value })

    render() {
        return (
            <div>
                {this.props.open && (
                    <div>
                        <div style={styles.guideHeader}>
                            {i18n.t(
                                'With 2-Factor authentication turned on you will be asked to enter a second verification code when you log in. To generate this verification code you must use the Authenticator app. If you do not have this app you must download it on your phone/tablet.'
                            )}
                        </div>
                        <DownloadGuide
                            phoneType={this.state.phoneType}
                            onPhoneTypeChange={this.setPhoneType}
                        />
                    </div>
                )}
            </div>
        )
    }
}

SetupGuide.propTypes = { open: PropTypes.bool.isRequired }

export default SetupGuide
