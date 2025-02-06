import { DataProvider } from '@dhis2/app-runtime'
import { CssVariables } from '@dhis2/ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import AboutPage from './aboutPage/AboutPage.component.jsx'
import Account from './account/Account.component.jsx'
import PasswordChangeSuccessDialog from './account/PasswordChangeSuccessDialog.jsx'
import TwoFactor from './account/twoFactor/TwoFactor.jsx'
import Sidebar from './layout/Sidebar.component.jsx'
import Snackbar from './layout/Snackbar.component.jsx'
import AppTheme from './layout/theme.js'
import PersonalAccessTokens from './personalAccessTokens/PersonalAccessTokens.component.jsx'
import Profile from './profile/Profile.component.jsx'
import UserSettings from './settings/UserSettings.component.jsx'
import ViewProfile from './viewProfile/ViewProfile.component.jsx'

function WrappedApp(props) {
    return (
        <div className="content-wrap">
            <Sidebar currentSection={props.routes[1].path} />
            {props.children}
        </div>
    )
}
WrappedApp.propTypes = {
    children: PropTypes.any.isRequired,
    routes: PropTypes.array.isRequired,
}

class AppRouter extends Component {
    getChildContext() {
        return {
            d2: this.props.d2,
            muiTheme: AppTheme,
            featureToggle: {
                emailFieldAsModal: this.props?.d2?.system?.version?.minor > 41,
            },
        }
    }

    getDataProviderProps() {
        const baseUrl = this.props.d2.system.systemInfo.contextPath
        const apiUrl = this.props.d2.system.settings.api.baseUrl
        const versionString = apiUrl.split('/').pop()
        const apiVersion = isNaN(parseInt(versionString, 10))
            ? ''
            : versionString

        return { baseUrl, apiVersion }
    }

    getDefaultRedirect() {
        const enforceVerifiedEmail =
            this.props.d2?.system?.settings?.settings?.enforceVerifiedEmail
        const emailVerified = this.props.d2.currentUser.emailVerified

        // Redirect to the profile page if email is unverified and the setting is enforced
        return enforceVerifiedEmail && !emailVerified
            ? '/profile'
            : '/viewProfile'
    }

    render() {
        const defaultRedirect = this.getDefaultRedirect()

        return (
            <DataProvider {...this.getDataProviderProps()}>
                <CssVariables colors spacers />
                <MuiThemeProvider muiTheme={AppTheme}>
                    <div className="app-wrapper">
                        <Snackbar />
                        <Router history={hashHistory}>
                            <Route component={WrappedApp}>
                                <Route
                                    path="settings"
                                    component={UserSettings}
                                />
                                <Route path="profile" component={Profile} />
                                <Route path="account" component={Account} />
                                <Route path="twoFactor" component={TwoFactor} />
                                <Route
                                    path="passwordChanged"
                                    component={PasswordChangeSuccessDialog}
                                />
                                <Route
                                    path="viewProfile"
                                    component={ViewProfile}
                                />
                                <Route
                                    path="personalAccessTokens"
                                    component={PersonalAccessTokens}
                                />
                                <Route path="aboutPage" component={AboutPage} />
                                <Redirect from="/" to={defaultRedirect} />
                            </Route>
                        </Router>
                    </div>
                </MuiThemeProvider>
            </DataProvider>
        )
    }
}

AppRouter.propTypes = { d2: PropTypes.object.isRequired }
AppRouter.childContextTypes = {
    d2: PropTypes.object,
    muiTheme: PropTypes.object,
    featureToggle: PropTypes.object,
}

export default AppRouter
