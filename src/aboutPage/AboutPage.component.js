import PropTypes from 'prop-types'
import React, { Component } from 'react'
import i18n from '../locales'
import AboutSection from './AboutSection.component'

const parseDateFromUTCString = (utcString, d2, hideIfEmpty) => {
    try {
        if (!utcString) {
            return hideIfEmpty ? undefined : i18n.t('Never')
        }

        const locale = d2.currentUser.userSettings.settings.keyUiLocale
        const date = new Date(utcString)
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }
        return new Intl.DateTimeFormat(locale, options).format(date)
    } catch (error) {
        return i18n.t('Invalid date')
    }
}

const attributes = {
    systemInfo: [
        {
            label: 'web_api',
            // eslint-disable-next-line react/display-name
            getDisplayValue: (_value, d2) => (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${d2.system.systemInfo.contextPath}/api`}
                >
                    {i18n.t('Browse it here')}
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
        {
            label: 'lastAnalyticsTablePartitionSuccess',
            getDisplayValue: (value, d2) =>
                parseDateFromUTCString(value, d2, true),
        },
        'intervalSinceLastAnalyticsTablePartitionSuccess',
        'lastAnalyticsTablePartitionRuntime',
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
    databaseInfo: ['name', 'user', 'spatialSupport'],
}

class AboutPage extends Component {
    translate = s => this.context.d2.i18n.getTranslation(s)

    getAttributes = (selected, source) =>
        selected.reduce((acc, attribute) => {
            if (typeof attribute === 'object') {
                const value = attribute.getDisplayValue(
                    source[attribute.label],
                    this.context.d2
                )
                if (value || value === false) {
                    acc.push({
                        label: this.translate(attribute.label),
                        value,
                    })
                }
            } else if (source[attribute]) {
                acc.push({
                    label: this.translate(attribute),
                    value: source[attribute],
                })
            }

            return acc
        }, [])

    render = () => {
        const { d2 } = this.context
        const systemInfo = this.getAttributes(
            attributes.systemInfo,
            d2.system.systemInfo
        )
        const databaseInfo = this.getAttributes(
            attributes.databaseInfo,
            d2.system.systemInfo.databaseInfo
        )

        return (
            <div className="content-area">
                {systemInfo.length > 0 && (
                    <AboutSection
                        header={i18n.t('System info')}
                        attributes={systemInfo}
                    />
                )}

                {databaseInfo.length > 0 && (
                    <AboutSection
                        header={i18n.t('Database')}
                        attributes={databaseInfo}
                    />
                )}
            </div>
        )
    }
}

AboutPage.contextTypes = { d2: PropTypes.object.isRequired }

export default AboutPage
