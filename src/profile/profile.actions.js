import { getInstance as getD2 } from 'd2';
import Action from 'd2-ui/lib/action/Action';
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';
import log from 'loglevel';
import userSettingsActions from '../app.actions';
import userSettingsKeyMapping from '../userSettingsMapping';
import isValidWhatsApp from './isValidWhatsApp';
import userProfileStore from './profile.store';

// Add whatsApp validation to the validator set
wordToValidatorMap.set('whats_app', isValidWhatsApp);

const userProfileActions = Action.createActionsFromNames(['save']);

userProfileActions.save.subscribe(({ data, complete, error }) => {
    const [key, value] = data;
    let payload = { [key]: String(value).trim() || ' ' }; // TODO: Ugly hack to allow saving empty fields

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
            if (
                !validators.reduce(
                    (prev, curr) => prev && wordToValidatorMap.get(curr)(value),
                    true
                )
            ) {
                log.warn(
                    `One or more validators did not pass for field "${key}" and value "${value}"`
                );
                return;
            }
        }

        getProfileUpdatePromise({
            key,
            value,
            payload,
            userId: userProfileStore.state.id,
            d2,
        })
            .then(() => {
                log.debug('User Profile updated successfully.');
                userSettingsActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation(
                        'update_user_profile_success'
                    ),
                    status: 'success',
                });
                complete();
            })
            .catch((err) => {
                userSettingsActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation('update_user_profile_fail'),
                    status: 'error',
                });
                log.error('Failed to update user profile:', err);
                error();
            });
    });
});

function getProfileUpdatePromise({ key, value, payload, userId, d2 }) {
    const api = d2.Api.getApi();
    if (key === 'avatar') {
        if (value) {
            // Set avatar
            // Post avatar directly to the `/user/<ID>` endpoint, because d2 update calls to `/me` cause issues
            return api.patch(`/users/${userId}`, { avatar: value.id });
        } else {
            // Clear avatar
            return removeAvatar(userId, api);
        }
    }

    return api.update('me', payload);
}

async function removeAvatar(userId, api) {
    const url = `/users/${userId}`;
    const user = await api.get(url, { fields: ':owner' });
    delete user.avatar;
    return api.update(url, user);
}

export default userProfileActions;
