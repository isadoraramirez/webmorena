import React from 'react';
import Sidebar from './components/navigation/sidebar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import inicio from './components/users/users';
import notificaciones from './components/users/alert';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import routes from './components/routes';
export default class App extends Component {
	render() {
		const menu = routes.map((route, index) => {
			return route.component ? (
				<Route
					key={index}
					path={route.path}
					exact={route.exact}
					name={route.name}
					render={(props) => <route.component {...props} />}
				/>
			) : null;
		});
		return (
			<div id="App">
				<Switch>
					{menu}
					<Redirect from="/" />
				</Switch>
				<Router>
					<Sidebar />
					<Route path="/" exact component={inicio} />
					<Route path="/notificaciones" exact component={notificaciones} />
				</Router>
			</div>
		);
	}
}
