import { FlatButton, Dialog } from 'material-ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'

const Status2FAChangeDialog = ({
    closeSetupDialog,
    handleDialogAnswer,
    dialogOpened,
    dialogTitle,
}) => {
    const buttons = [
        <FlatButton
            label={i18n.t('No')}
            primary
            onClick={closeSetupDialog}
            key="no"
        />,
        <FlatButton
            label={i18n.t('Yes')}
            primary
            onClick={handleDialogAnswer}
            key="yes"
        />,
    ]
    return (
        <Dialog
            title={dialogTitle}
            actions={buttons}
            modal
            open={dialogOpened}
        />
    )
}

Status2FAChangeDialog.propTypes = {
    closeSetupDialog: PropTypes.func.isRequired,
    dialogOpened: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    handleDialogAnswer: PropTypes.func.isRequired,
}

export default Status2FAChangeDialog
