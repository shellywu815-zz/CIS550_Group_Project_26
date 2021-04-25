import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestMovies from './BestMovies';
import Summary from './Summary'
import Select from './Select'
import Search from './Search'

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Summary />}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => <Dashboard />}
						/>
						<Route
							path="/recommendations"
							render={() => <Recommendations />}
						/>
						<Route
							path="/bestmovies"
							render={() => <BestMovies />}
						/>

						<Route
							path="/summary"
							render={() => <Summary />}
						/>

						<Route
							path="/select"
							render={() => <Select />}
						/>
						<Route
							path="/search"
							render={() => <Search />}
						/>
					</Switch>
				</Router>
			</div>
		);
	};
};