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
            key: null,
            label: i18n.t('Web API'),
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
            key: null,
            label: i18n.t('Current user'),
            getDisplayValue: (_value, d2) => d2.currentUser.username,
        },
        { key: 'version', label: i18n.t('Version') },
        { key: 'revision', label: i18n.t('Build revision') },
        {
            key: 'buildTime',
            label: i18n.t('Build date'),
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        {
            key: 'jasperReportsVersion',
            label: i18n.t('Jasper reports version'),
        },
        { key: 'userAgent', label: i18n.t('User agent') },
        {
            key: 'serverDate',
            label: i18n.t('Server date'),
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        {
            key: 'lastAnalyticsTableSuccess',
            label: i18n.t('Last analytics table generation'),
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        {
            key: 'intervalSinceLastAnalyticsTableSuccess',
            label: i18n.t('Time since last analytics table generation'),
        },
        {
            key: 'lastAnalyticsTableRuntime',
            label: i18n.t('Last analytics table runtime'),
        },
        {
            key: 'lastAnalyticsTablePartitionSuccess',
            label: i18n.t('Last continuous analytics table update'),
            getDisplayValue: (value, d2) =>
                parseDateFromUTCString(value, d2, true),
        },
        {
            key: 'intervalSinceLastAnalyticsTablePartitionSuccess',
            label: i18n.t('Time since last continuous analytics table update'),
        },
        {
            key: 'lastAnalyticsTablePartitionRuntime',
            label: i18n.t('Last continuous analytics table runtime'),
        },
        { key: 'environmentVariable', label: i18n.t('Environment variable') },
        { key: 'systemId', label: i18n.t('System ID') },
        {
            key: 'lastSystemMonitoringSuccess',
            label: i18n.t('Last monitoring success'),
            getDisplayValue: (value, d2) => parseDateFromUTCString(value, d2),
        },
        {
            key: 'externalDirectory',
            label: i18n.t('External configuration directory'),
        },
        { key: 'fileStoreProvider', label: i18n.t('File store provider') },
        { key: 'nodeId', label: i18n.t('Node ID') },
        { key: 'cacheProvider', label: i18n.t('Cache provider') },
        { key: 'readReplicaCount', label: i18n.t('Read replica count') },
        { key: 'javaOpts', label: i18n.t('Java opts') },
        { key: 'javaVersion', label: i18n.t('Java version') },
        { key: 'javaVendor', label: i18n.t('Java vendor') },
        { key: 'osName', label: i18n.t('OS name') },
        { key: 'osArchitecture', label: i18n.t('OS architecture') },
        { key: 'osVersion', label: i18n.t('OS version') },
        { key: 'memoryInfo', label: i18n.t('Memory info') },
        { key: 'cpuCores', label: i18n.t('CPU cores') },
        { key: 'calendar', label: i18n.t('Calendar') },
    ],
    databaseInfo: [
        { key: 'name', label: i18n.t('Name') },
        { key: 'user', label: i18n.t('User') },
        { key: 'spatialSupport', label: i18n.t('Spatial support') },
    ],
}

class AboutPage extends Component {
    getAttributes = (selected, source) =>
        selected.reduce((acc, attribute) => {
            if (attribute.getDisplayValue !== undefined) {
                const value = attribute.getDisplayValue(
                    source[attribute.key],
                    this.context.d2
                )
                if (value !== undefined) {
                    acc.push({ label: attribute.label, value })
                }
            } else if (source[attribute.key]) {
                acc.push({
                    label: attribute.label,
                    value: source[attribute.key],
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
