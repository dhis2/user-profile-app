import React from 'react';

import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';
import appActions from '../app.actions';

function SidebarWrapper(props, context) {
    const sideBarSections = [
        { key: 'settings', label: context.d2.i18n.getTranslation('user_settings'), icon: 'build' },
        { key: 'profile', label: context.d2.i18n.getTranslation('user_profile'), icon: 'face' },
        { key: 'account', label: context.d2.i18n.getTranslation('account_settings'), icon: 'account_circle' },
    ];

    return (
        <Sidebar
            sections={sideBarSections}
            onChangeSection={appActions.setCategory}
            currentSection={props.currentSection || 'profile'}
        />
    );
}

SidebarWrapper.propTypes = { currentSection: React.PropTypes.string };
SidebarWrapper.contextTypes = { d2: React.PropTypes.object.isRequired };

export default SidebarWrapper;
