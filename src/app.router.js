import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, hashHistory, Redirect } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderBar from '@dhis2/d2-ui-header-bar';

import AppTheme from './layout/theme';

import Snackbar from './layout/Snackbar.component';
import Sidebar from './layout/Sidebar.component';

import Profile from './profile/Profile.component';
import Account from './account/Account.component';
import TwoFactor from './account/twoFactor/TwoFactor';
import UserSettings from './settings/UserSettings.component';
import ViewProfile from './viewProfile/ViewProfile.component';
import AboutPage from './aboutPage/AboutPage.component';

function WrAppadApp(props) {
    return (
        <div>
            <Sidebar currentSection={props.routes[1].path} />
            {props.children}
        </div>
    );
}
WrAppadApp.propTypes = { routes: PropTypes.array.isRequired, children: PropTypes.any.isRequired };

class AppRouter extends Component {
    getChildContext() {
        return {
            d2: this.props.d2,
            muiTheme: AppTheme,
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={AppTheme}>
                <div className="app-wrapper">
                    <HeaderBar d2={this.props.d2} />
                    <Snackbar />
                    <Router history={hashHistory}>
                        <Route component={WrAppadApp}>
                            <Route path="settings" component={UserSettings} />
                            <Route path="profile" component={Profile} />
                            <Route path="account" component={Account} />
                            <Route path="twoFactor" component={TwoFactor} />
                            <Route path="viewProfile" component={ViewProfile} />
                            <Route path="aboutPage" component={AboutPage} />
                            <Redirect from="/" to="/viewProfile" />
                        </Route>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

AppRouter.propTypes = { d2: PropTypes.object.isRequired };
AppRouter.childContextTypes = { d2: PropTypes.object, muiTheme: PropTypes.object };

export default AppRouter;
