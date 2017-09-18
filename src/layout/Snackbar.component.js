import React from 'react';

import Snackbar from 'material-ui/Snackbar';

import appActions from '../app.actions';

class SnackWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbarMessage: '',
            showSnackbar: false,
        };

        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    componentDidMount() {
        this.subscriptions = [];

        this.subscriptions.push(appActions.showSnackbarMessage.subscribe((params) => {
            const message = params.data;
            this.setState({ snackbarMessage: message, showSnackbar: !!message });
        }));
    }

    componentWillUnmount() {
        this.subscriptions.forEach((sub) => {
            sub.dispose();
        });
    }

    closeSnackbar() {
        this.setState({ showSnackbar: false });
    }

    render() {
        return (
            <Snackbar
                message={this.state.snackbarMessage || ''}
                autoHideDuration={1250}
                open={this.state.showSnackbar}
                onRequestClose={this.closeSnackbar}
            />
        );
    }
}

export default SnackWrapper;
