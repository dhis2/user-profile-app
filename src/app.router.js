import React from 'react';

import { Router, Route, hashHistory } from 'react-router';

import App from './app.component.js'

export default class AppRouter extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (<Router history={hashHistory}>
                    <Route path="/" d2={this.props.d2} component={App}/>
                    <Route path="profile" d2={this.props.d2} component={App}/>
                    <Route path="account" d2={this.props.d2} component={App}/>
                    <Route path="user" d2={this.props.d2} component={App}/>
                </Router>);
	}
}

AppRouter.propTypes = {
	d2: React.PropTypes.object,
}
