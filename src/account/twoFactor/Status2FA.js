import React from 'react';
import PropTypes from 'prop-types';

import { Paper, RaisedButton } from 'material-ui';

const styles = {
    status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        padding: '0 1rem',
    },
    statusButton: {
        margin: '1rem',
    },
    statusMessage: {
        margin: '1rem',
    },
};

const Status2FA = ({ openSetupDialog, statusMessage, buttonLabel }) => (
    <Paper style={styles.status}>
        <div style={styles.statusMessage}>
            {statusMessage}
        </div>
        <RaisedButton
            style={styles.statusButton}
            label={buttonLabel}
            onClick={openSetupDialog}
            primary
        />
    </Paper>
);

Status2FA.propTypes = {
    openSetupDialog: PropTypes.func.isRequired,
    statusMessage: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
};

export default Status2FA;
