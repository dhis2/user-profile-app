import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component.js'
import PropTypes from 'prop-types'
import React from 'react'
import { getTWOFAType } from '../account/twoFactor/useTwoFaToggleMutation.js'
import appActions from '../app.actions.js'
import i18n from '../locales/index.js'
import optionValueStore from '../optionValue.store.js'
import userProfileStore from '../profile/profile.store.js'

function SidebarWrapper(props) {
    const twoFactorMethods = optionValueStore?.state.twoFactorMethods
    const hasEnabledTwoFactorMethods = !!getTWOFAType(
        userProfileStore.state.twoFactorType
    )

    const hasTwoFactorMethods = twoFactorMethods
        ? Object.values(twoFactorMethods).some(Boolean)
        : false

    const showTwoFactorMethods =
        !props.twoFactorAuthByType ||
        hasTwoFactorMethods ||
        hasEnabledTwoFactorMethods

    const sideBarSections = [
        {
            key: 'profile',
            label: i18n.t('User profile'),
            icon: 'create',
        },
        {
            key: 'settings',
            label: i18n.t('User settings'),
            icon: 'build',
        },
        {
            key: 'account',
            label: i18n.t('Account settings'),
            icon: 'settings',
        },
        showTwoFactorMethods
            ? {
                  key: 'twoFactor',
                  label: i18n.t('Two factor authentication'),
                  icon: 'phonelink_lock',
              }
            : undefined,
        {
            key: 'viewProfile',
            label: i18n.t('Full profile'),
            icon: 'face',
        },
        {
            key: 'personalAccessTokens',
            label: i18n.t('Personal access tokens'),
            icon: 'badge',
        },
        {
            key: 'aboutPage',
            label: i18n.t('About DHIS2'),
            icon: 'public',
        },
    ].filter((section) => section)

    return (
        <Sidebar
            sections={sideBarSections}
            onChangeSection={appActions.setCategory}
            currentSection={props.currentSection}
        />
    )
}

SidebarWrapper.propTypes = {
    currentSection: PropTypes.string,
    twoFactorAuthByType: PropTypes.bool,
}
SidebarWrapper.defaultProps = {
    currentSection: 'profile',
    twoFactorAuthByType: true,
}

export default SidebarWrapper
