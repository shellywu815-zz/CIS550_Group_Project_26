import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class VcInvestsRow extends React.Component {
	render() {
		return (
			<div className="VCInvestments">
				<div className="name">{this.props.name}</div>
				<div className="industry">{this.props.industry}</div>
				<div className="round">{this.props.round}</div>
				<div className="amount">{this.props.amount}</div>
				<div className="date">{this.props.date}</div>
			</div>
		);
	};
};
