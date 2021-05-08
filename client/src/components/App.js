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

export default class App extends React.Component {
vcpath = new URLSearchParams("/vc/:fid");

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
							path={this.vcpath}
							render={() => <VCProfile fid = {this.vcpath.get("fid")}/>}
						/>
					</Switch>
				</Router>
			</div>
		);
	};
};