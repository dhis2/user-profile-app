import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from 'material-ui';
import RadioButtons from './RadioButtons';
import PhoneTypeInstructions from './PhoneTypeInstructions';

const styles = {
    downloadGuideWrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
    },
    authIcon: {
        height: '2em',
        width: '2em',
        marginRight: '1rem',
    },
    downloadGuide: {
        display: 'flex',
        flexDirection: 'column',
    },
    authDownloadHeader: {
        fontWeight: 500,
        marginTop: '0.4rem',
        marginBottom: '1rem',
    },
};

const DownloadGuide = ({ phoneType, onPhoneTypeChange }, context) => (
    <Paper style={styles.downloadGuideWrapper}>
        <img style={styles.authIcon} alt="authIcon" src="auth.png" />

        <div style={styles.downloadGuide}>
            <div style={styles.authDownloadHeader}>{context.d2.i18n.getTranslation('download_app')}</div>
            <div >
                {context.d2.i18n.getTranslation('what_phone_tablet')}
                <RadioButtons setPhoneType={onPhoneTypeChange} />
                <PhoneTypeInstructions phoneType={phoneType} />
            </div>
        </div>
    </Paper>
);

DownloadGuide.propTypes = {
    onPhoneTypeChange: PropTypes.func.isRequired,
    phoneType: PropTypes.number.isRequired,
};
DownloadGuide.contextTypes = { d2: PropTypes.object.isRequired };

export default DownloadGuide;
