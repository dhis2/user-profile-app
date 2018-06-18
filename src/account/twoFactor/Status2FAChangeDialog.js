import React from 'react';
import PropTypes from 'prop-types';

import { FlatButton, Dialog } from 'material-ui';

const Status2FAChangeDialog = ({ closeSetupDialog, handleDialogAnswer, dialogOpened, dialogTitle }, context) => {
    const buttons = [
        <FlatButton label={context.d2.i18n.getTranslation('no')} primary onClick={closeSetupDialog} />,
        <FlatButton label={context.d2.i18n.getTranslation('yes')} primary onClick={handleDialogAnswer} />,
    ];
    return (
        <Dialog
            title={dialogTitle}
            actions={buttons}
            modal
            open={dialogOpened}
        />
    );
};

Status2FAChangeDialog.propTypes = {
    closeSetupDialog: PropTypes.func.isRequired,
    handleDialogAnswer: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogOpened: PropTypes.bool.isRequired,
};

Status2FAChangeDialog.contextTypes = { d2: PropTypes.object.isRequired };

export default Status2FAChangeDialog;
