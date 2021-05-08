import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TotalInvestmentsByMajorsRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
        return(
		    <div className="TotalInvestmentsByMajorsRow">
				<div className="major">{this.props.major}</div>
				<div className="investments">{this.props.investments}</div>
		    </div>
        );
	};
};