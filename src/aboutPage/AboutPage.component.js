import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AboutSection from './AboutSection.component';

const parseDateFromUTCString = (utcString, d2) => {
    const locale = d2.currentUser.userSettings.settings.keyUiLocale;
    const date = new Date(utcString);
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
};

const attributes = {
    systemInfo: [
        {
            label: 'web_api',
            getDisplayValue: (_value, d2, translate) => (
                <a target="_blank" href={`${d2.system.systemInfo.contextPath}/api`}>
                    {translate('browse_it_here')}
                </a>
            ),
        },
        {
            label: 'current_user',
            getDisplayValue: (_value, d2) => d2.currentUser.username,
        },
        'version',
        'revision',
        {
            label: 'buildTime',
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        'jasperReportsVersion',
        'userAgent',
        {
            label: 'serverDate',
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        {
            label: 'lastAnalyticsTableSuccess',
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        'intervalSinceLastAnalyticsTableSuccess',
        'lastAnalyticsTableRuntime',
        'environmentVariable',
        'systemId',
        {
            label: 'lastSystemMonitoringSuccess',
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        'externalDirectory',
        'fileStoreProvider',
        'nodeId',
        'cacheProvider',
        'readReplicaCount',
        'javaOpts',
        'javaVersion',
        'javaVendor',
        'osName',
        'osArchitecture',
        'osVersion',
        'memoryInfo',
        'cpuCores',
        'calendar',
    ],
    databaseInfo: [
        'name',
        'user',
        'spatialSupport',
    ],
};

class AboutPage extends Component {
    translate = s => this.context.d2.i18n.getTranslation(s);

    getAttributes = (selected, source) => selected
        .reduce((acc, attribute) => {
            const value = typeof attribute === 'object' ? 
                source[attribute.label] : 
                source[attribute];
            
            if (!value) {
                return acc;
            }

            if (typeof attribute === 'object') {
                acc.push({
                    label: this.translate(attribute.label),
                    value: attribute.getDisplayValue(
                        value,
                        this.context.d2,
                        this.translate
                    ),
                })
            } else {
                acc.push({
                    label: this.translate(attribute),
                    value,
                })
            }

            return acc;
        }, []);

    render = () => {
        const { d2 } = this.context;
        const systemInfo = this.getAttributes(attributes.systemInfo, d2.system.systemInfo)
        const databaseInfo = this.getAttributes(attributes.databaseInfo, d2.system.systemInfo.databaseInfo)

        return (
            <div className="content-area">
                {systemInfo.length > 0 && (
                    <AboutSection
                        header={this.translate('system_info')}
                        attributes={systemInfo}
                    />
                )}

                {databaseInfo.length > 0 && (
                    <AboutSection
                        header={this.translate('database')}
                        attributes={databaseInfo}
                    />
                )}
            </div>
        );
    }
};

AboutPage.contextTypes = { d2: PropTypes.object.isRequired };

export default AboutPage;
