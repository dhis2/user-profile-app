import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import appActions from '../app.actions';

const messageStatus = {
    warning: { backgroundColor: '#FFA726' },
    error: { backgroundColor: '#EF5350' },
    neutral: { backgroundColor: 'black' },
    success: { backgroundColor: '#9CCC65' },
};

const DEFAULT_AUTOHIDE_DURATION = 1250

class SnackWrapper extends Component {
    state = {
        snackbarMessage: '',
        showSnackbar: false,
        messageStatus: messageStatus['neutral'],
        autoHideDuration: DEFAULT_AUTOHIDE_DURATION
    };
    
    componentDidMount() {
        this.subscriptions = [];

        this.subscriptions.push(appActions.showSnackbarMessage.subscribe((params) => {
            const message = params.data.message;
            const status = params.data.status ? params.data.status : 'neutral';
            const autoHideDuration = params.data.permanent ? undefined : DEFAULT_AUTOHIDE_DURATION

            this.setState({ 
                snackbarMessage: message, 
                showSnackbar: !!message,
                messageStatus: messageStatus[status],
                autoHideDuration,
            });
        }));
    }

    componentWillUnmount() {
        this.subscriptions.forEach((sub) => {
            sub.dispose();
        });
    }

    closeSnackbar = () => {
        this.setState({ showSnackbar: false });
    }

    render() {
        return (
            <Snackbar
                message={this.state.snackbarMessage}
                autoHideDuration={this.state.autoHideDuration}
                bodyStyle={this.state.messageStatus}
                open={this.state.showSnackbar}
                onRequestClose={this.closeSnackbar}
            />
        );
    }
}

export default SnackWrapper;
