import { useConfig } from '@dhis2/app-runtime'
import { Paper } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'

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

const QRCode = ({ open }) => {
    const { baseUrl, apiVersion } = useConfig()

    return (
        <div style={styles.qrCodePaperWrapper}>
            {open && (
                <Paper style={styles.qrCodePaper}>
                    <h1>Henkie</h1>
                    <div style={styles.statusMessage}>
                        <b>{i18n.t('Barcode/QR code to scan')}</b>
                    </div>
                    <img
                        style={styles.qrCode}
                        alt="qrCode"
                        src={`${baseUrl}/api/${apiVersion}/2fa/qrCode`}
                    />
                </Paper>
            )}
        </div>
    )
}

QRCode.propTypes = { open: PropTypes.bool.isRequired }

export default QRCode
