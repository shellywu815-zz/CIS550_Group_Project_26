import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Summary from './Summary'
import Select from './Select'
import Search from './Search'
import VCProfile from './VCProfile'
import StartupProfile from './StartupProfile'
import IndustryProfile from './IndustryProfile'

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
						<Route
							path="/vc/:fid"	
							component = {VCProfile}
						/>
						<Route
							path="/startup/:cid"	
							component = {StartupProfile}
						/>
						<Route
							path="/industry/:ind"	
							component = {IndustryProfile}
						/>
					</Switch>
				</Router>
			</div>
		);
	};
};