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

accountActions.setPassword.subscribe(({ data: [oldPassword, newPassword, onSuccess], complete, error }) => {
    const payload = { oldPassword, newPassword };

    getD2().then((d2) => {
        const api = d2.Api.getApi();
        api.update('/me/changePassword', payload)
            .then(() => {
                log.debug('Password updated successfully.');
                
                appActions.setCategory('passwordChanged');

                onSuccess();
                complete();
            })
            .catch((err) => {
                const message = err && err.message && typeof err.message === 'string' 
                    ? err.message 
                    : d2.i18n.getTranslation('password_update_failed');

                appActions.showSnackbarMessage({
                    message,
                    status: 'error',
                    permanent: true,
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
