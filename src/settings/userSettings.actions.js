import { getInstance as getD2 } from 'd2'
import Action from 'd2-ui/lib/action/Action'
import log from 'loglevel'
import appActions from '../app.actions'
import userSettingsStore from './userSettings.store'

const userSettingsActions = Action.createActionsFromNames(['save'])

userSettingsActions.save.subscribe(({ data, complete, error }) => {
    const key = data[0]
    const value =
        data[1] === 'null' || data[1] === 'system_default' ? null : data[1]

    getD2().then(d2 => {
        d2.currentUser.userSettings
            .set(key, value)
            .then(() => {
                userSettingsStore.state[key] = value
                userSettingsStore.setState(userSettingsStore.state)

                log.debug('User Setting updated successfully.')
                appActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation('settings_updated'),
                    status: 'success',
                })
                complete()
            })
            .catch(err => {
                userSettingsStore.setState(userSettingsStore.state)
                log.warn('API call failed:', err)
                appActions.showSnackbarMessage({
                    message: d2.i18n.getTranslation(
                        'failed_to_update_settings'
                    ),
                    status: 'error',
                })
                error()
            })
    })
})

export default userSettingsActions
