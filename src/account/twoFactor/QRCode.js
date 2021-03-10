import { Paper } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'
import profileSettingsStore from '../../profile/profile.store'

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
}

const QRCode = ({ open }) => (
    <div style={styles.qrCodePaperWrapper}>
        {open && (
            <Paper style={styles.qrCodePaper}>
                <div style={styles.statusMessage}>
                    <b>{i18n.t('Barcode/QR code to scan')}</b>
                </div>
                <img
                    style={styles.qrCode}
                    alt="qrCode"
                    src={profileSettingsStore.state.qrCodeUrl}
                />
            </Paper>
        )}
    </div>
)

QRCode.propTypes = { open: PropTypes.bool.isRequired }

export default QRCode
