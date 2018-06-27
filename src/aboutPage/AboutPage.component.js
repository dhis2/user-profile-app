import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AboutSection from './AboutSection.component';

const attributes = {
    systemInfo: [
        'version',
        'revision',
        'buildTime',
        'osName',
        'osVersion',
        'osArchitecture',
        'serverDate',
        'cpuCores',
        'memoryInfo',
        'javaVersion',
        'lastAnalyticsTableRuntime',
        'lastAnalyticsTableSuccess',
        'fileStoreProvider',
        'jasperReportsVersion',
        'calendar',
        'cacheProvider',
         'userAgent',
    ],
    databaseInfo: [
        'name',
        'user',
        'type',
    ],
};

class AboutPage extends Component {
    translate = s => this.context.d2.i18n.getTranslation(s);

    getAttributes = (selected, source) => selected
        .map(attribute => ({
            label: this.translate(attribute),
            value: source[attribute],
        }))
        .filter(attribute => 
            attribute.value !== undefined
        );

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
