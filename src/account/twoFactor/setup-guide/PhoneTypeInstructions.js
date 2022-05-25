import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../../locales/index.js'
import phoneTypes from './phoneTypes.js'

const playStoreLink = (
    <a
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        rel="noopener"
    >
        Play store.
    </a>
)
const appStoreLink = (
    <a
        href="https://itunes.apple.com/no/app/google-authenticator/id388497605?mt=8"
        rel="noreferrer"
    >
        App store.
    </a>
)

const styles = {
    phoneTypeInstructions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    instructionItem: {
        marginBottom: 10,
    },
}

const PhoneTypeInstructions = ({ phoneType }) =>
    phoneType !== phoneTypes.DEFAULT && (
        <div style={styles.phoneTypeInstructions}>
            <div style={styles.instructionItem}>
                <b>1. </b>
                {`${i18n.t('Download the Authenticator App from the ')} `}
                {phoneType === phoneTypes.ANDROID && playStoreLink}
                {phoneType === phoneTypes.IPHONE && appStoreLink}
            </div>
            <div style={styles.instructionItem}>
                <b>2. </b>
                {`${i18n.t('In the Authenticator App select ')} `}
                <b>{i18n.t('Begin setup.')}</b>
            </div>
            <div style={styles.instructionItem}>
                <b>3. </b>
                {`${i18n.t('Choose ')} `}
                <b>{i18n.t('Scan a barcode.')}</b>
            </div>
        </div>
    )

PhoneTypeInstructions.propTypes = { phoneType: PropTypes.number.isRequired }

export default PhoneTypeInstructions
