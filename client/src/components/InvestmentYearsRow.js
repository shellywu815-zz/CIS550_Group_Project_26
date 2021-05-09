import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class InvestmentYearsRow extends React.Component {
	render() {
		return (
			<div className="investmentYears">
			    <div className="year">{this.props.year}</div>
				<div className="amount">{this.props.amount}</div>
				
			</div>
		);
	};
};