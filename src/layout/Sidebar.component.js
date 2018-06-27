import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';
import appActions from '../app.actions';

function SidebarWrapper(props, context) {
    const sideBarSections = [
        { key: 'profile', label: context.d2.i18n.getTranslation('edit_user_profile'), icon: 'create' },
        { key: 'settings', label: context.d2.i18n.getTranslation('edit_user_settings'), icon: 'build' },
        { key: 'account', label: context.d2.i18n.getTranslation('edit_account_settings'), icon: 'settings' },
        { key: 'viewProfile', label: context.d2.i18n.getTranslation('view_profile'), icon: 'face' },
        { key: 'aboutPage', label: context.d2.i18n.getTranslation('about_dhis2'), icon: 'public' },
    ];

    return (
        <Sidebar
            sections={sideBarSections}
            onChangeSection={appActions.setCategory}
            currentSection={props.currentSection}
        />
    );
}

SidebarWrapper.propTypes = { currentSection: PropTypes.string };
SidebarWrapper.defaultProps = { currentSection: 'profile' };
SidebarWrapper.contextTypes = { d2: PropTypes.object.isRequired };

export default SidebarWrapper;
