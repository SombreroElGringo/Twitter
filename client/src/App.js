import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import IndexScreen from './screens/index';
import SignScreen from './screens/sign';
import AccountScreen from './screens/account';
import NotificationScreen from './screens/notification';
import ErrorScreen from './screens/error';

export default class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
				<Route exact path="/" component={IndexScreen} />
				<Route exact path="/sign" component={SignScreen} />
				<Route exact path="/account" component={AccountScreen} />
				<Route exact path="/account/:username" component={AccountScreen} />
				<Route exact path="/notifications" component={NotificationScreen} />
				<Route component={ErrorScreen} />
				</Switch>
			</Router>
		);
	}
}