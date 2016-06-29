import React from 'react';
import { shallow } from 'enzyme';
import log from 'loglevel';

import App from '../../src/app.component.js';
import HeaderBar from 'd2-ui/lib/header-bar/HeaderBar.component';
import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';

describe('App', () => {
    let appComponent;

    beforeEach(() => {
        appComponent = shallow(<App route={ {path:'user', d2:{i18n: {getTranslation: function(t) { return t;}}}} } d2={{}}/>);
    });

    it('should render the HeaderBar component from d2-ui', () => {
        expect(appComponent.find(HeaderBar)).to.have.length(1);
    });

    it('should render the Sidebar component from d2-ui', () => {
        expect(appComponent.find(Sidebar)).to.have.length(1);
    });

    it('should pass three sections to the Sidebar component', () => {
        const sidebarComponent = appComponent.find(Sidebar);

        expect(sidebarComponent.props().sections).to.have.length(3);
    });

    it('should pass the key and label properties for the sections', () => {
        const sidebarComponent = appComponent.find(Sidebar);
        const sidebarSections = sidebarComponent.props().sections;

        expect(sidebarSections).to.deep.equal([
            { icon: "face", key: 'profile', label: 'user_profile' },
            { icon: "account_circle", key: 'account', label: 'account_settings' },
            { icon: "build", key: 'user', label: 'user_settings' },
        ]);
    });
});