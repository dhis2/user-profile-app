import React from 'react';
import log from 'loglevel';
import {hashHistory} from 'react-router';

// Material UI
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

//From D2-UI
import HeaderBar from 'd2-ui/lib/header-bar/HeaderBar.component';

import AppTheme from '../theme';

import profileActions from './profileActions'

class Profile extends React.Component {
    constructor(props, context){
        super(props);
        this.props = props;
        this.userId = this.props.params.userID;
        this.d2 = this.props.route.d2;
        if(!this.userId){ hashHistory.push('profile'); };
    }

    getChildContext() {
        return {
            d2: this.props.route.d2,
        };
    }

    componentWillMount() {
        this.subscriptions = [];

        /* eslint-disable complexity */
        this.subscriptions.push(profileActions.getProfile.subscribe((arg) => {
            this.d2.Api.getApi().get(`users/${arg.data}`)
            .then( res => { 
                console.log(res)
            })
            .catch ( err => {
                hashHistory.push('profile');
                log.error('Failed to get user details', err);
            });
        }));
        /* eslint-enable complexity */

        profileActions.getProfile(this.userId);
    }

    componentWillUnmount() {
        this.subscriptions.forEach(sub => {
            sub.dispose();
        });
    }

    render() {
        return (
            <div className="app-wrapper">
                <HeaderBar />
            </div>
        );
    }
}

Profile.propTypes = { d2: React.PropTypes.object };
Profile.childContextTypes = { d2: React.PropTypes.object };

export default Profile;
