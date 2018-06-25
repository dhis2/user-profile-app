import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

import InfoItem from '../layout/InfoItem.component';
import InfoHeader from '../layout/InfoHeader.component';

const styles = {
    card: {
        marginTop: 8,
        marginRight: '1rem',
        padding: '0 1rem',
    },
};

const attributes = {
    system: {
        systemInfo: [

            // Build
            'buildTime',
            'version',
            'revision',
            'cacheProvider',

            // Server
            'osName',
            'osVersion',
            'osArchitecture',
            'serverDate',
            'cpuCores',
            'memoryInfo',
            'javaVersion',

            // Anlytics
            'lastAnalyticsTableRuntime',
            'lastAnalyticsTableSuccess',

            // Other
            'fileStoreProvider',
            'jasperReportsVersion',
        ],
    },
};

const retrieveAttributes = d2 => attributes.system.systemInfo.map(attr => ({
    label: attr,
    value: d2.system.systemInfo[attr],
}));

const AboutPage = (_, { d2 }) => {
    const aboutAttributes = retrieveAttributes(d2);
    const translate = s => d2.i18n.getTranslation(s);

    return (
        <div className="content-area">
            <InfoHeader text={translate('about_dhis2')} />
            <Card style={styles.card}>
                <CardText>
                    <div className="info-content">
                        {aboutAttributes.map(({ label, value }) => (
                            <InfoItem
                                key={label}
                                label={translate(label)}
                                value={value}
                                labelStyle={{ width: '230px' }}
                            />
                        ))}
                    </div>
                </CardText>
            </Card>
        </div>
    );
};

AboutPage.contextTypes = { d2: PropTypes.object.isRequired };

export default AboutPage;
