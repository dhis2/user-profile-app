import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';
import appActions from '../app.actions';

const messageStatus = {
    warning: { backgroundColor: '#FFA726' },
    error: { backgroundColor: '#EF5350' },
    neutral: { backgroundColor: 'black' },
    success: { backgroundColor: '#9CCC65' },
};

class SnackWrapper extends Component {
    state = {
        snackbarMessage: '',
        showSnackbar: false,
        messageStatus: messageStatus['neutral'],
    };
    
    componentDidMount() {
        this.subscriptions = [];

        this.subscriptions.push(appActions.showSnackbarMessage.subscribe((params) => {
            const message = params.data.message;
            const status = params.data.status ? params.data.status : 'neutral';
            this.setState({ 
                snackbarMessage: message, 
                showSnackbar: !!message,
                messageStatus: messageStatus[status],
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
                autoHideDuration={1250}
                bodyStyle={this.state.messageStatus}
                open={this.state.showSnackbar}
                onRequestClose={this.closeSnackbar}
            />
        );
    }
}

export default SnackWrapper;
