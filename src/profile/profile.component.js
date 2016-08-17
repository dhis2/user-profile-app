//To be part of dashboard app

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

const styles = {
    header: {
        fontSize: 24,
        fontWeight: 100,
        color: AppTheme.rawTheme.palette.textColor,
        padding: '6px 16px',
    },
    card: {
        marginTop: 8,
        margin: '1rem',
        maxWidth: '600px',
    },
    fieldValue: {
        fontSize: 20,
        fontWeight: 100,
    },
};

class Profile extends React.Component {
    constructor(props, context){
        super(props);
        this.props = props;
        this.userId = this.props.params.userID;
        this.d2 = this.props.route.d2;
        if(!this.userId){ hashHistory.push('profile'); };
        this.state = Object.assign({});
        this.renderFields = this.renderFields.bind(this);
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
                this.setState(res);
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

    renderFields() {
        const fields = [
            'email',
            'phoneNumber',
            'introduction',
            'jobTitle',
            'gender',
            'birthday',
            'nationality',
            'employer',
            'education',
            'interests',
            'languages',
        ]

        const labels = {
            email: 'user_email_address',
            phoneNumber: 'phone_number',
            introduction: 'introduction',
            jobTitle: 'job_title',
            gender: 'gender',
            birthday: 'birthday',
            nationality: 'nationality',
            employer: 'employer',
            education: 'education',
            interests: 'interests',
            languages: 'languages',
        }

        const profileFields = fields.map((key) => {
            const label = labels[key];
            return (<CardText key={key}>
                        <div style={styles.fieldKey}>{this.d2.i18n.getTranslation(label)}</div>
                        {this.state[key] ? <div style={styles.fieldValue}>{this.state[key]}</div> : <div style={styles.fieldValue} >Not Avaialble</div>}
                    </CardText>);
        });

        return profileFields;
    }

    render() {

        const renderFields = this.renderFields();

        return (
            <div className="app-wrapper">
                <HeaderBar />
                <div style={styles.header}>{this.state.displayName}</div>
                <Card style={styles.card} key={this.props.category}>
                    { renderFields }
                </Card>
            </div>
        );
    }
}

Profile.propTypes = { d2: React.PropTypes.object };
Profile.childContextTypes = { d2: React.PropTypes.object };

export default Profile;
