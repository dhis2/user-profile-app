import log from 'loglevel';

import { getInstance as getD2 } from 'd2/lib/d2';
import Action from 'd2-ui/lib/action/Action';
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';

import userSettingsActions from '../app.actions';
import userProfileStore from './profile.store';
import userSettingsKeyMapping from '../userSettingsMapping';

const userProfileActions = Action.createActionsFromNames([
    'save',
]);


userProfileActions.save.subscribe(({ data, complete, error }) => {
    const [key, value] = data;
    let payload = key === 'newPassword'
        ? ({ userCredentials: { password: value } })
        : ({ [key]: String(value).trim() || ' ' }); // TODO: Ugly hack to allow saving empty fields

    if (key === 'birthday') {
        const date = new Date(value);
        payload = { [key]: date.toISOString() };
    }

    getD2().then((d2) => {
        userProfileStore.state[key] = value;
        userProfileStore.setState(userProfileStore.state);

        // Run field validators
        if (Array.isArray(userSettingsKeyMapping[key].validators)) {
            const validators = userSettingsKeyMapping[key].validators;
            if (!validators.reduce((prev, curr) => prev && wordToValidatorMap.get(curr)(value), true)) {
                log.warn(`One or more validators did not pass for field "${key}" and value "${value}"`);
                return;
            }
        }

        const api = d2.Api.getApi();
        api.update('me', payload)
            .then(() => {
                log.debug('User Profile updated successfully.');
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('update_user_profile_success'));
                complete();
            })
            .catch((err) => {
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('update_user_profile_fail'));
                log.error('Failed to update user profile:', err);
                error();
            });
    });
});

export default userProfileActions;
