import { DataProvider } from '@dhis2/app-runtime'
import { CssVariables } from '@dhis2/ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider.js'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import AboutPage from './aboutPage/AboutPage.component.js'
import Account from './account/Account.component.js'
import PasswordChangeSuccessDialog from './account/PasswordChangeSuccessDialog.js'
import TwoFactor from './account/twoFactor/TwoFactor.js'
import TwoFactor41AndLower from './account/twoFactor/TwoFactor41AndLower.js'
import Sidebar from './layout/Sidebar.component.js'
import Snackbar from './layout/Snackbar.component.js'
import AppTheme from './layout/theme.js'
import PersonalAccessTokens from './personalAccessTokens/PersonalAccessTokens.component.js'
import Profile from './profile/Profile.component.js'
import UserSettings from './settings/UserSettings.component.js'
import ViewProfile from './viewProfile/ViewProfile.component.js'

function WrappedApp(props) {
    return (
        <div className="content-wrap">
            <Sidebar
                currentSection={props.routes[1].path}
                twoFactorAuthByType={props.twoFactorMethods}
            />
            {props.children}
        </div>
    )
}

WrappedApp.propTypes = {
    children: PropTypes.any.isRequired,
    routes: PropTypes.array.isRequired,
    twoFactorMethods: PropTypes.bool.isRequired,
}

class AppRouter extends Component {
    get minorVersion() {
        return this.props?.d2?.system?.version?.minor || 'Unknown'
    }

    getChildContext() {
        return {
            d2: this.props.d2,
            muiTheme: AppTheme,
            featureToggle: {
                emailFieldAsModal: this.minorVersion > 41,
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
                            <Route
                                getComponent={(location, callback) =>
                                    callback(null, (props) => (
                                        <WrappedApp
                                            {...props}
                                            twoFactorMethods={
                                                this.minorVersion > 41
                                            }
                                        />
                                    ))
                                }
                            >
                                <Route
                                    path="settings"
                                    component={UserSettings}
                                />
                                <Route path="profile" component={Profile} />
                                <Route path="account" component={Account} />
                                <Route
                                    path="twoFactor"
                                    component={
                                        this.minorVersion > 41
                                            ? TwoFactor
                                            : TwoFactor41AndLower
                                    }
                                />
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
