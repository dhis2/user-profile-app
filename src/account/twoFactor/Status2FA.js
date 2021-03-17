import { Paper, RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'

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
}

const Status2FA = ({ openSetupDialog, statusMessage, buttonLabel }) => (
    <Paper style={styles.status}>
        <div style={styles.statusMessage}>{statusMessage}</div>
        <RaisedButton
            style={styles.statusButton}
            label={buttonLabel}
            onClick={openSetupDialog}
            primary
        />
    </Paper>
)

Status2FA.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    openSetupDialog: PropTypes.func.isRequired,
    statusMessage: PropTypes.string.isRequired,
}

export default Status2FA
