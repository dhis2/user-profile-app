import { getInstance as getD2 } from 'd2'
import Action from 'd2-ui/lib/action/Action'
import log from 'loglevel'
import appActions from '../app.actions.js'
import i18n from '../locales/index.js'
import userProfileStore from '../profile/profile.store.js'

const accountActions = Action.createActionsFromNames([
    'setPassword',
    'setTwoFactorStatus',
    'getQrCode',
])

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

accountActions.setTwoFactorStatus.subscribe(({ data, complete, error }) => {
    const { twoFaEnabled, twoFaConfirmationCode } = data

    getD2().then((d2) => {
        const api = d2.Api.getApi()
        const url = twoFaEnabled ? '/2fa/enabled' : '/2fa/disabled'
        const payload = { code: twoFaConfirmationCode }

        api.post(url, payload)
            .then(() => {
                log.debug(`2 Factor is now ${twoFaEnabled}.`)
                appActions.showSnackbarMessage({
                    message: twoFaEnabled
                        ? i18n.t('2-Factor successfully turned ON')
                        : i18n.t('2-Factor successfully turned OFF'),
                    status: 'success',
                })
                userProfileStore.state.twoFaEnabled = twoFaEnabled
                userProfileStore.setState(userProfileStore.state)
                complete()
            })
            .catch((err) => {
                appActions.showSnackbarMessage({
                    message: twoFaEnabled
                        ? i18n.t('Failed to turn ON 2-Factor')
                        : i18n.t('Failed to turn OFF 2-Factor'),
                    status: 'error',
                })
                log.error('Failed to change 2 Factor status:', err)
                error()
            })
    })
})

export default accountActions
