import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from 'material-ui';

const styles = {
    setupInstructionsPaperWrap: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
    },
    setupInstructions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    instructionTitle: {
        marginBottom: 10,
    },

    instructionItem: {
        marginBottom: 10,
    },
};

const SetupInstructions = (props, context) => (
    <Paper style={styles.setupInstructionsPaperWrap} >
        <div style={styles.setupInstructions}>
            <div style={styles.instructionTitle}>
                <b>{`${context.d2.i18n.getTranslation('how_to_enable')} `}</b>
            </div>
            <div style={styles.instructionItem}>
                <b>1. </b>
                {`${context.d2.i18n.getTranslation('open_auth_app')} `}
            </div>
            <div style={styles.instructionItem}>
                <b>2. </b>
                {`${context.d2.i18n.getTranslation('scan_barcode')} `}
            </div>
            <div style={styles.instructionItem}>
                <b>3. </b>
                {`${context.d2.i18n.getTranslation('click_enable')} `}
            </div>
            <div style={styles.instructionItem}>
                <b>4. </b>
                {`${context.d2.i18n.getTranslation('enter_code')} `}
            </div>
        </div>
    </Paper>
);

SetupInstructions.contextTypes = { d2: PropTypes.object.isRequired };

export default SetupInstructions;
