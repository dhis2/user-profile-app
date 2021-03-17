import { useD2 } from '@dhis2/app-runtime-adapter-d2'
import log from 'loglevel'
import React from 'react'
import AppRouter from './app.router.js'
import optionValueStore from './optionValue.store'
import userProfileStore from './profile/profile.store'
import userSettingsStore from './settings/userSettings.store'
import './locales'
import './layout/app.css'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

const AppWrapper = () => {
    const { d2 } = useD2({
        onInitialized: d2 => {
            const api = d2.Api.getApi()

            return Promise.all([
                api.get('system/styles'),
                api.get('locales/ui'),
                api.get('locales/db'),
                api.get('userSettings', { useFallback: false }),
                d2.system.settings.all(),
                api.get('2fa/qr'),
            ]).then(
                results => {
                    const styles = (results[0] || []).map(style => ({
                        id: style.path,
                        displayName: style.name,
                    }))
                    const uiLocales = (results[1] || []).map(locale => ({
                        id: locale.locale,
                        displayName: locale.name,
                    }))
                    const dbLocales = (results[2] || []).map(locale => ({
                        id: locale.locale,
                        displayName: locale.name,
                    }))
                    const systemDefault = { ...results[4] }

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
                },
                error => {
                    log.error('Failed to load user settings:', error)
                }
            )
        },
    })

    if (!d2) {
        return null
    }

    return <AppRouter d2={d2} />
}

export default AppWrapper
