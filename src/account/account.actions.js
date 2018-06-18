import log from 'loglevel';

import { getInstance as getD2 } from 'd2/lib/d2';
import Action from 'd2-ui/lib/action/Action';

import appActions from '../app.actions';
import userProfileStore from '../profile/profile.store';

const accountActions = Action.createActionsFromNames([
    'setPassword',
    'setTwoFactorStatus',
    'getQrCode',
]);

accountActions.setPassword.subscribe(({ data: [password, onSuccess], complete, error }) => {
    const payload = { userCredentials: { password } };
    getD2().then((d2) => {
        const api = d2.Api.getApi();
        api.update('/me', payload)
            .then(() => {
                log.debug('Password updated successfully.');
                appActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation('password_update_success'),
                    status: 'success',
                });
                onSuccess();
                complete();
            })
            .catch((err) => {
                appActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation('password_update_failed'),
                    status: 'error',
                });
                log.error('Failed to update password:', err);
                error();
            });
    });
});

accountActions.setTwoFactorStatus.subscribe(({ data: twoFA, complete, error }) => {
    const payload = { userCredentials: { twoFA } };
    const status = twoFA ? 'on' : 'off';

    getD2().then((d2) => {
        userProfileStore.state.twoFA = twoFA;
        userProfileStore.setState(userProfileStore.state);

        const api = d2.Api.getApi();
        api.update('/me', payload)
            .then(() => {
                log.debug(`2 Factor is now ${status}.`);
                appActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation(`twoFA_${status}_success`),
                    status: 'success',
                });
                complete();
            })
            .catch((err) => {
                appActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation(`twoFA_${status}_fail`),
                    status: 'error',
                });
                log.error('Failed to change 2 Factor status:', err);
                error();
            });
    });
});

accountActions.getQrCode.subscribe(() => {
});

export default accountActions;
