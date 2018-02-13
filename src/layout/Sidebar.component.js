import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';
import appActions from '../app.actions';

function SidebarWrapper(props, context) {
    const sideBarSections = [
        { key: 'settings', label: context.d2.i18n.getTranslation('user_settings'), icon: 'build' },
        { key: 'profile', label: context.d2.i18n.getTranslation('user_profile'), icon: 'face' },
        { key: 'account', label: context.d2.i18n.getTranslation('account_settings'), icon: 'account_circle' },
        { key: 'viewProfile', label: context.d2.i18n.getTranslation('view_profile'), icon: 'face' },
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
