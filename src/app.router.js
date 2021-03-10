import { DataProvider } from '@dhis2/app-runtime'
import { HeaderBar } from '@dhis2/ui-widgets'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import AboutPage from './aboutPage/AboutPage.component'
import Account from './account/Account.component'
import PasswordChangeSuccessDialog from './account/PasswordChangeSuccessDialog'
import TwoFactor from './account/twoFactor/TwoFactor'
import Sidebar from './layout/Sidebar.component'
import Snackbar from './layout/Snackbar.component'
import AppTheme from './layout/theme'
import i18n from './locales'
import Profile from './profile/Profile.component'
import UserSettings from './settings/UserSettings.component'
import ViewProfile from './viewProfile/ViewProfile.component'

function WrAppadApp(props) {
    return (
        <div className="content-wrap">
            <Sidebar currentSection={props.routes[1].path} />
            {props.children}
        </div>
    )
}
WrAppadApp.propTypes = {
    children: PropTypes.any.isRequired,
    routes: PropTypes.array.isRequired,
}

class AppRouter extends Component {
    getChildContext() {
        return {
            d2: this.props.d2,
            muiTheme: AppTheme,
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

    render() {
        return (
            <DataProvider {...this.getDataProviderProps()}>
                <MuiThemeProvider muiTheme={AppTheme}>
                    <div className="app-wrapper">
                        <HeaderBar appName={i18n.t('User profile')} />
                        <Snackbar />
                        <Router history={hashHistory}>
                            <Route component={WrAppadApp}>
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
                                <Route path="aboutPage" component={AboutPage} />
                                <Redirect from="/" to="/viewProfile" />
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
}

export default AppRouter
