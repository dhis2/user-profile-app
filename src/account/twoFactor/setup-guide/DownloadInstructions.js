import React from 'react';
import PropTypes from 'prop-types';

import phoneTypes from './phoneTypes';

const playStoreLink = <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank">Play store.</a>;

const styles = {
    downloadInstructions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    instructionItem: {
        marginBottom: 10,
    },
};

const DownloadInstructions = ({ phoneType }, context) => (
    phoneType !== phoneTypes.DEFAULT &&
        <div style={styles.downloadInstructions}>
            <div style={styles.instructionItem}>
                <b>1. </b>
                {`${context.d2.i18n.getTranslation('download_app_from')} `}
                {phoneType === phoneTypes.ANDROID && playStoreLink}
                {phoneType === phoneTypes.IPHONE && `${context.d2.i18n.getTranslation('app_store')} `}
            </div>
            <div style={styles.instructionItem}>
                <b>2. </b>
                {`${context.d2.i18n.getTranslation('in_app_select')} `}
                <b>{context.d2.i18n.getTranslation('begin_setup')}</b>
            </div>
            <div style={styles.instructionItem}>
                <b>3. </b>
                {`${context.d2.i18n.getTranslation('choose')} `}
                <b>{context.d2.i18n.getTranslation('scan_barcode')}</b>
            </div>
        </div>
);

DownloadInstructions.propTypes = { phoneType: PropTypes.number.isRequired };
DownloadInstructions.contextTypes = { d2: PropTypes.object.isRequired };

export default DownloadInstructions;
