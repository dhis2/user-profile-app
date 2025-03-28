import { getInstance as getD2 } from 'd2'
import Action from 'd2-ui/lib/action/Action'
import log from 'loglevel'
import appActions from '../app.actions.jsx'
import i18n from '../locales/index.js'

const accountActions = Action.createActionsFromNames(['setPassword'])

accountActions.setPassword.subscribe(
    ({ data: [oldPassword, newPassword, onSuccess], complete, error }) => {
        const payload = { oldPassword, newPassword }

        getD2().then((d2) => {
            const api = d2.Api.getApi()
            api.update('/me/changePassword', payload)
                .then(() => {
                    log.debug('Password updated successfully.')

                    appActions.setCategory('passwordChanged')

                    onSuccess()
                    complete()
                })
                .catch((err) => {
                    const message =
                        err && err.message && typeof err.message === 'string'
                            ? err.message
                            : i18n.t('Failed to update password')

                    appActions.showSnackbarMessage({
                        message,
                        status: 'error',
                        permanent: true,
                    })
                    log.error('Failed to update password:', err)
                    error()
                })
        })
    }
)

export default accountActions
