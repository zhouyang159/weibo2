import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import SearchPage from '../components/SearchPage';
import Profile from '../components/Profile';
import Detail from '../components/Detail';

import userContext from '../userContext';

class Routes extends Component {
	render() {
		return (
			<userContext.Provider>
				<Router>
					<Switch>
						<Route exact path="/" component={App}></Route>
						<Route path="/search_page" component={SearchPage}></Route>
						<Route path="/detail/:id" component={Detail}></Route>
						<Route path="/profile/:id" component={Profile}></Route>
					</Switch>
				</Router>
			</userContext.Provider>
		);
	}
}

export default Routes; 
