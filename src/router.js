import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Apply from './page/apply';
import Register from './page/register';
import Login from './page/login';
import Home from './page/home/index';

export default class App extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="apply" component={Apply} />
		    	<Route path="login" component={Login} />
		    	<Route path="register" component={Register} />
		    	<Route path="/" component={Home} />
		  	</Router>
		)
	}
}
