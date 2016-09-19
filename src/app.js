const dhisDevConfig = DHIS_CONFIG; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';
import log from 'loglevel';

import { init, config, getUserSettings, getManifest } from 'd2/lib/d2';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';
import appActions from './app.actions';
import './layout/app.scss';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<LoadingMask />, document.getElementById('app'));

function configI18n(userSettings) {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale !== 'en' && uiLocale !== null) {
        config.i18n.sources.add(`i18n/module/i18n_module_${uiLocale}.properties`);
    }
    config.i18n.sources.add('i18n/module/i18n_module_en.properties');
}

getManifest('./manifest.webapp')
    .then(manifest => {
        const baseUrl = process.env.NODE_ENV === 'production' ? manifest.getBaseUrl() : dhisDevConfig.baseUrl;
        config.baseUrl = `${baseUrl}/api/25`;
        log.info(`Loading: ${manifest.name} v${manifest.version}`);
        log.info(`Built ${manifest.manifest_generated_at}`);
    })
    .then(getUserSettings)
    .then(configI18n)
    .then(init)
    .then(appActions.init)
    .catch(error => {
        log.error(error);
        ReactDOM.render(<div>Failed to start app.</div>, document.getElementById('app'));
    });
