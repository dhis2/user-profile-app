import { getInstance as getD2 } from 'd2'
import Action from 'd2-ui/lib/action/Action.js'
import log from 'loglevel'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { hashHistory } from 'react-router'
import AppRouter from './app.router.jsx'
import optionValueStore from './optionValue.store.js'
import userProfileStore from './profile/profile.store.js'
import userSettingsStore from './settings/userSettings.store.js'

const appActions = Action.createActionsFromNames([
    'init',
    'setCategory',
    'showSnackbarMessage', // Implemented in Snackbar.component.js
])

appActions.init.subscribe(() => {
    getD2().then((d2) => {
        const api = d2.Api.getApi()

        Promise.all([
            api.get('system/styles'),
            api.get('locales/ui'),
            api.get('locales/db'),
            api.get('userSettings', { useFallback: false }),
            d2.system.settings.all(),
            api.get('2fa/qr'),
        ]).then(
            (results) => {
                const styles = (results[0] || []).map((style) => ({
                    id: style.path,
                    displayName: style.name,
                }))
                const uiLocales = (results[1] || []).map((locale) => ({
                    id: locale.locale,
                    displayName: locale.name,
                }))
                const dbLocales = (results[2] || []).map((locale) => ({
                    id: locale.locale,
                    displayName: locale.name,
                }))
                const systemDefault = Object.keys(results[4]).reduce(
                    (defaults, key) => {
                        defaults[key] = results[4][key]
                        return defaults
                    },
                    {}
                )

                userProfileStore.setState(d2.currentUser)
                userProfileStore.state.qrCodeUrl = results[5].url
                userSettingsStore.setState(results[3])
                optionValueStore.setState({
                    styles,
                    uiLocales,
                    dbLocales,
                    systemDefault,
                })

                log.debug(
                    'Current user profile loaded:',
                    userProfileStore.state
                )
                log.debug(
                    'Current user settings loaded:',
                    userSettingsStore.state
                )
                const container = document.querySelector('#app')
                const root = createRoot(container)
                root.render(<AppRouter d2={d2} />)
            },
            (error) => {
                log.error('Failed to load user settings:', error)
            }
        )
    })
})

appActions.setCategory.subscribe(({ data: target }) => {
    hashHistory.push(`/${target}`)
})

export default appActions
