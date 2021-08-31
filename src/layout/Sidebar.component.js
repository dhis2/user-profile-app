import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component'
import PropTypes from 'prop-types'
import React from 'react'
import appActions from '../app.actions'
import i18n from '../locales'

function SidebarWrapper(props) {
    const sideBarSections = [
        {
            key: 'profile',
            label: i18n.t('Edit user profile'),
            icon: 'create',
        },
        {
            key: 'settings',
            label: i18n.t('Edit user settings'),
            icon: 'build',
        },
        {
            key: 'account',
            label: i18n.t('Edit account settings'),
            icon: 'settings',
        },
        {
            key: 'viewProfile',
            label: i18n.t('View full profile'),
            icon: 'face',
        },
        {
            key: 'personalAccessTokens',
            label: i18n.t('Manage personal access tokens'),
            icon: 'badge',
        },
        {
            key: 'aboutPage',
            label: i18n.t('About DHIS2'),
            icon: 'public',
        },
    ]

    return (
        <Sidebar
            sections={sideBarSections}
            onChangeSection={appActions.setCategory}
            currentSection={props.currentSection}
        />
    )
}

SidebarWrapper.propTypes = { currentSection: PropTypes.string }
SidebarWrapper.defaultProps = { currentSection: 'profile' }

export default SidebarWrapper
