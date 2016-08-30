import log from 'loglevel';

import { getInstance as getD2 } from 'd2/lib/d2';
import Action from 'd2-ui/lib/action/Action';

import appActions from '../app.actions';

const accountActions = Action.createActionsFromNames([
    'setPassword',
]);

accountActions.setPassword.subscribe(({ data: password, complete, error }) => {
    const payload = { userCredentials: { password } };

    getD2().then(d2 => {
        const api = d2.Api.getApi();
        api.update('me', payload)
            .then(() => {
                log.debug('Password updated successfully.');
                appActions.showSnackbarMessage(d2.i18n.getTranslation('password_update_success'));
                complete();
            })
            .catch((err) => {
                appActions.showSnackbarMessage(d2.i18n.getTranslation('password_update_failed'));
                log.error('Failed to update password:', err);
                error();
            });
    });
})

export default accountActions;