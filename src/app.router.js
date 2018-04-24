import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, hashHistory, Redirect } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

import AppTheme from './layout/theme';

import Snackbar from './layout/Snackbar.component';
import Sidebar from './layout/Sidebar.component';

import Profile from './profile/profile.component';
import Account from './account/account.component';
import TwoFactor from './account/twoFactor/twoFactor.component';
import UserSettings from './settings/userSettings.component';
import ViewProfile from './viewProfile/viewProfile.component';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

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
            <MuiThemeProvider muiTheme={AppTheme} >
                <div className="app-wrapper">
                    <HeaderBar />
                    <Snackbar />
                    <Router history={hashHistory}>
                        <Route component={WrAppadApp}>
                            <Route path="settings" component={UserSettings} />
                            <Route path="profile" component={Profile} />
                            <Route path="account" component={Account} />
                            <Route path="twoFactor" component={TwoFactor} />
                            <Route path="viewProfile" component={ViewProfile} />
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
