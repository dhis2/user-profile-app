import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

import profileSettingsStore from '../../profile/profile.store';

const styles = {
    qrCodePaperWrapper: {
        padding: '1rem 0 0',
    },
    qrCodePaper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '1rem',
    },
    qrCode: {
        padding: '1rem',
    },
};


const QRCode = ({ open }, context) => (
    <div style={styles.qrCodePaperWrapper} >
        {open &&
        <Paper style={styles.qrCodePaper}>
            <div style={styles.statusMessage}>
                <b>{context.d2.i18n.getTranslation('qr_code')}</b>
            </div>
            <img
                style={styles.qrCode}
                alt="qrCode"
                src={profileSettingsStore.state.qrCodeUrl}
            />
        </Paper>}
    </div>
);

QRCode.propTypes = { open: PropTypes.bool.isRequired };
QRCode.contextTypes = { d2: PropTypes.object.isRequired };

export default QRCode;
