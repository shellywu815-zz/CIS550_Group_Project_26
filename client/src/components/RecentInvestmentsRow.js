import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecentInvestmentsRow extends React.Component {
	render() {
		return (
			<div className="recentInvestments">
			    <div className="year">{this.props.year}</div>
				<div className="number">{this.props.number}</div>
				
			</div>
		);
	};
};