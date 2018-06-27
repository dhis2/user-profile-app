import React, { Component } from 'react';
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

const AboutSection = ({ header, attributes }) => (
    <div>
        <InfoHeader text={header} />
            <Card style={styles.card}>
                <CardText>
                    <div className="info-content">
                        {attributes
                            .map(({ label, value }) => (
                                <InfoItem
                                    key={label}
                                    label={label}
                                    value={value}
                                />
                            )
                        )}
                    </div>
                </CardText>
            </Card>
    </div>
);

AboutSection.propTypes = {
    header: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        })
    ).isRequired,
};

export default AboutPage;
