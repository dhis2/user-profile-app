import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DownloadGuide from './DownloadGuide';

import phoneTypes from './phoneTypes';

const styles = {
    guideHeader: {
        fontWeight: 300,
        padding: '24px 16px 24px 16px',
    },
};

class SetupGuide extends Component {
    state = {
        phoneType: phoneTypes.DEFAULT,
    }

    setPhoneType = (event, value) => this.setState({ phoneType: value });
    translate = key => this.context.d2.i18n.getTranslation(key);

    render() {
        return (
            <div>
                {this.props.open &&
                <div>
                    <div style={styles.guideHeader}>{this.translate('qr_code_instructions')}</div>
                    <DownloadGuide phoneType={this.state.phoneType} onPhoneTypeChange={this.setPhoneType}/>
                </div>}
            </div>
        );
    }
}

SetupGuide.propTypes = { open: PropTypes.bool.isRequired };
SetupGuide.contextTypes = { d2: PropTypes.object.isRequired };

export default SetupGuide;
