import { Paper } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../../locales/index.js'
import PhoneTypeInstructions from './PhoneTypeInstructions.js'
import RadioButtons from './RadioButtons.js'

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
}

const DownloadGuide = ({ phoneType, onPhoneTypeChange }) => (
    <Paper style={styles.downloadGuideWrapper}>
        <img style={styles.authIcon} alt="authIcon" src="auth.png" />

        <div style={styles.downloadGuide}>
            <div style={styles.authDownloadHeader}>
                {i18n.t('Download the Authenticator app')}
            </div>
            <div>
                {i18n.t('What kind of phone/tablet do you have?')}
                <RadioButtons setPhoneType={onPhoneTypeChange} />
                <PhoneTypeInstructions phoneType={phoneType} />
            </div>
        </div>
    </Paper>
)

DownloadGuide.propTypes = {
    phoneType: PropTypes.number.isRequired,
    onPhoneTypeChange: PropTypes.func.isRequired,
}

export default DownloadGuide
