import React from 'react';
import ReactDOM from 'react-dom';
import log from 'loglevel';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { init, config, getUserSettings, getManifest } from 'd2/lib/d2';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';
import appActions from './app.actions';
import AppTheme from './layout/theme';
import './layout/app.css';

injectTapEventPlugin();
const dhisDevConfig = DHIS_CONFIG; // eslint-disable-line

ReactDOM.render(<MuiThemeProvider theme={AppTheme}><LoadingMask /></MuiThemeProvider>, document.getElementById('app'));

function configI18n(userSettings) {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale !== 'en' && uiLocale !== null) {
        config.i18n.sources.add(`i18n/module/i18n_module_${uiLocale}.properties`);
    }
    config.i18n.sources.add('i18n/module/i18n_module_en.properties');
}

getManifest('./manifest.webapp')
    .then((manifest) => {
        const baseUrl = process.env.NODE_ENV === 'production' ? manifest.getBaseUrl() : dhisDevConfig.baseUrl;
        const apiVersion = manifest.dhis2.apiVersion;
        config.baseUrl = `${baseUrl}/api/${apiVersion}`;
        log.info(`Loading: ${manifest.name} v${manifest.version}`);
        log.info(`Built ${manifest.manifest_generated_at}`);
    })
    .then(getUserSettings)
    .then(configI18n)
    .then(init)
    .then(appActions.init)
    .catch((error) => {
        log.error(error);
        ReactDOM.render(<div>Failed to start app.</div>, document.getElementById('app'));
    });
