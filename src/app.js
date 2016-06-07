// When the app is built for development, DHIS_CONFIG is replaced with the config read from $DHIS2_HOME/config.js[on]
// When the app is built for production, process.env.NODE_ENV is replaced with the string 'production', and
// DHIS_CONFIG is replaced with an empty object
const dhisDevConfig = DHIS_CONFIG; // eslint-disable-line

// This code will only be included in non-production builds of the app
// It sets up the Authorization header to be used during CORS requests
// This way we can develop using webpack without having to install the application into DHIS2.
if (process.env.NODE_ENV !== 'production') {
    jQuery.ajaxSetup({ headers: { Authorization: dhisDevConfig.authorization } }); // eslint-disable-line
}

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'
import log from 'loglevel';
import { init, config, getUserSettings, getManifest } from 'd2/lib/d2';

import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';

// The react-tap-event-plugin is required by material-ui to make touch screens work properly with onClick events
import 'react-tap-event-plugin';

import App from './app.component';
import './app.scss';

import userSettingsActions from './userSettingsActions';
import userSettingsStore from './userSettingsStore';

// Render the a LoadingMask to show the user the app is in loading
// The consecutive render after we did our setup will replace this loading mask
// with the rendered version of the application.
render(<LoadingMask />, document.getElementById('app'));

/**
 * Renders the application into the page.
 *
 * @param d2 Instance of the d2 library that is returned by the `init` function.
 */
function startApp(d2) {
    
    // userSettingsActions.load handler
    userSettingsActions.load.subscribe((args) => {
        Promise.all([
            d2.currentUser.userSettings.all(),
        ]).then(results => {
            userSettingsStore.setState(Object.assign({}, results[0], d2.currentUser));
            log.debug('Usersettings loaded successfully.', userSettingsStore.state);
            render(<Router history={hashHistory}>
                    <Route path="/" d2={d2} component={App}/>
                    <Route path="profile" d2={d2} component={App}/>
                    <Route path="account" d2={d2} component={App}/>
                    <Route path="user" d2={d2} component={App}/>
                    </Router>, document.querySelector('#app'));
        }, error => {
            log.error('Failed to load user settings:', error);
        });
    });

    // userSettingsActions.saveProfile handler
    userSettingsActions.saveUserKey.subscribe((args) => {
        const [fieldData, value] = args.data;
        const key = Array.isArray(fieldData) ? fieldData.join('') : fieldData;
        
        d2.currentUser.userSettings.set(fieldData, value)
            .then(() => {
                const newState = userSettingsStore.state;
                newState[fieldData] = value;
                userSettingsStore.setState(newState);
                log.debug('User Setting updated successfully.');
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('settings_updated'));
            })
            .catch((err) => {
                log.error('Failed to save configuration:', err);
            });
    });

    userSettingsActions.saveProfile.subscribe((args) => {
        const [fieldData, value] = args.data;
        const data = Object.assign({});
        data[fieldData] = value;
        d2.Api.getApi().update('/24/me', data)
            .then(() =>{
                const newState = userSettingsStore.state;
                newState[fieldData] = value;
                userSettingsStore.setState(newState);
                log.debug('User Profile updated successfully.');
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('settings_updated'));
            })
            .catch((err) => {
                log.error('Failed to save configuration:', err);
            });
    });

    userSettingsActions.load();
}

function configI18n(userSettings) {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale !== 'en') {
        config.i18n.sources.add(`i18n/module/i18n_module_${uiLocale}.properties`);
    }
    config.i18n.sources.add('i18n/module/i18n_module_en.properties');
}

// Load the application manifest to be able to determine the location of the Api
// After we have the location of the api, we can set it onto the d2.config object
// and initialise the library. We use the initialised library to pass it into the app
// to make it known on the context of the app, so the sub-components (primarily the d2-ui components)
// can use it to access the api, translations etc.
getManifest('./manifest.webapp')
    .then(manifest => {
        const baseUrl = process.env.NODE_ENV === 'production' ? manifest.getBaseUrl() : dhisDevConfig.baseUrl;
        config.baseUrl = `${baseUrl}/api`;
    })
    .then(getUserSettings)
    .then(configI18n)
    .then(init)
    .then(startApp)
    .catch(log.error.bind(log));
