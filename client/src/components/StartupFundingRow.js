import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class StartupFundingRow extends React.Component {
	render() {
		return (
			<div className="StartupFunding">
				<div className="round">{this.props.round}</div>
				<div className="name">{this.props.name}</div>
				<div className="amount">{this.props.amount}</div>
				<div className="date">{this.props.date}</div>
			</div>
		);
	};
};
