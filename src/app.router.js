import React from 'react';
import { Router, Route, hashHistory, Redirect } from 'react-router';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);
import AppTheme from './layout/theme';

import Snackbar from './layout/Snackbar.component';
import Sidebar from './layout/Sidebar.component';

import Profile from './profile/profile.component';
import Account from './account/account.component';
import UserSettings from './settings/userSettings.component';

function WrAppadApp(props) {
    return <div><Sidebar currentSection={props.routes[1].path} />{props.children}</div>;
}
WrAppadApp.propTypes = { routes: React.PropTypes.array, children: React.PropTypes.any };

class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        const d2 = this.props.d2;
        this.getTranslation = d2.i18n.getTranslation.bind(d2.i18n);
    }

    getChildContext() {
        return {
            d2: this.props.d2,
            muiTheme: AppTheme,
        };
    }

    render() {
        return (
            <div className="app-wrapper">
                <HeaderBar />
                <Snackbar />
                <Router history={hashHistory}>
                    <Route component={WrAppadApp}>
                        <Route path="settings" component={UserSettings} />
                        <Route path="profile" component={Profile} />
                        <Route path="account" component={Account} />
                        <Redirect from="/" to="/settings" />
                    </Route>
                </Router>
            </div>
        );
    }
}

AppRouter.propTypes = { d2: React.PropTypes.object };
AppRouter.childContextTypes = { d2: React.PropTypes.object, muiTheme: React.PropTypes.object };

export default AppRouter;
