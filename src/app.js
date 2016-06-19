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
import { isEmail, isRequired } from 'd2-ui/lib/forms/Validators';

// The react-tap-event-plugin is required by material-ui to make touch screens work properly with onClick events
import 'react-tap-event-plugin';

import AppRouter from './app.router.js';
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

    const api = d2.Api.getApi();
    // userSettingsActions.load handler
    userSettingsActions.load.subscribe((args) => {
        Promise.all([
            d2.currentUser.userSettings.all(),
            d2.system.settings.all(),
            api.get('system/styles'),
            api.get('locales/ui'),
            api.get('locales/db'),
            api.get('userSettings', { useFallback: false }),
            api.get('systemSettings?key=keyUiLocale'),
            api.get('systemSettings?key=keyDbLocale'),
            api.get('systemSettings?key=keyStyle'),
            api.get('systemSettings?key=keyAnalysisDisplayProperty'),
            api.get('systemSettings?key=keyMessageEmailNotification'),
            api.get('systemSettings?key=keyMessageSmsNotification'),
        ]).then(results => {
            d2.i18n.customLabels = Object.assign({});
            // Stylesheets
            const styles = (results[2] || []).map(style => { 
                d2.i18n.customLabels[style.path] = style.name;
                return { id: style.path, displayName: style.name } 
            });

            // Locales
            const locales = (results[3] || []).map(locale => { 
                d2.i18n.customLabels[locale.locale] = locale.name;
                return { id: locale.locale, displayName: locale.name } 
            });

            // dbLocales
            const dblocales = (results[3] || []).map(locale => { 
                d2.i18n.customLabels[locale.locale] = locale.name;
                return { id: locale.locale, displayName: locale.name } 
            });
            d2.i18n.customLabels.name = d2.i18n.getTranslation('name');
            d2.i18n.customLabels.short_name = d2.i18n.getTranslation('short_name');
            d2.i18n.customLabels.true = d2.i18n.getTranslation('true_notifications');
            d2.i18n.customLabels.false = d2.i18n.getTranslation('false_notifications');

            //Add default system settings to d2
            d2.currentUser.systemSettingsDefault = Object.assign({});
            d2.currentUser.systemSettingsDefault['keyStyle'] = results[8]['keyStyle'];
            d2.currentUser.systemSettingsDefault['keyAnalysisDisplayProperty'] = results[9]['keyAnalysisDisplayProperty'];
            d2.currentUser.systemSettingsDefault['keyMessageEmailNotification'] = results[10]['keyMessageEmailNotification'].toString();
            d2.currentUser.systemSettingsDefault['keyMessageSmsNotification'] = results[11]['keyMessageSmsNotification'].toString();
            d2.currentUser.systemSettingsDefault['keyUiLocale'] = results[6]['keyUiLocale'];
            d2.currentUser.systemSettingsDefault['keyDbLocale'] = results[7]['keyDbLocale'];

            userSettingsStore.setState(Object.assign({}, results[5], {keyDateFormat: results[1].keyDateFormat}, d2.currentUser, {styles: styles}, {locales:locales}, {dblocales:dblocales}));
            
            log.debug('Usersettings loaded successfully.', userSettingsStore.state);
            render(<AppRouter d2={d2}/>, document.querySelector('#app'));
        }, error => {
            log.error('Failed to load user settings:', error);
        });
    });

    // userSettingsActions.saveProfile handler
    userSettingsActions.saveUserKey.subscribe((args) => {
        const [fieldData, value] = args.data;
        const key = Array.isArray(fieldData) ? fieldData.join('') : fieldData;
        let val = '';

        if(value !== 'systemDefault') {
            val = value;
        } 

        d2.currentUser.userSettings.set(fieldData, val)
            .then(() => {
                const newState = userSettingsStore.state;
                newState[fieldData] = value;
                userSettingsStore.setState(newState);
                log.debug('User Setting updated successfully.');
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('settings_updated'));
            })
            .catch((err) => {
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('update_settings_fail'));
                log.error('Failed to save configuration:', err);
            });
    });

    userSettingsActions.saveProfile.subscribe((args) => {
        const [fieldData, value] = args.data;
        if(fieldData === 'email' && !isEmail(value)) {
            userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('update_user_profile_fail'));
            return;
        }
        const data = Object.assign({});
        
        if(fieldData === 'newPassword') {
            data['userCredentials'] = Object.assign({}, {password: value});
        } else {
            data[fieldData] = value;
        }

        if((fieldData === 'firstName' || fieldData === 'surname') && !isRequired(value)) 
            return;
        
        d2.Api.getApi().update('/24/me', data)
            .then(() =>{
                const newState = userSettingsStore.state;
                newState[fieldData] = value;
                userSettingsStore.setState(newState);
                log.debug('User Profile updated successfully.');
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('update_user_profile_success'));
            })
            .catch((err) => {
                userSettingsActions.showSnackbarMessage(d2.i18n.getTranslation('update_user_profile_fail'));
                log.error('Failed to save configuration:', err);
            });
    });

    userSettingsActions.load();
}

function configI18n(userSettings) {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale !== 'en' && uiLocale !== null) {
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
