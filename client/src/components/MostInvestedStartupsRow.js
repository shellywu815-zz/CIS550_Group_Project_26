import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MostInvestedStartupsRow extends React.Component {
	/* ---- Q2 (Recommendations) ---- */
	render() {
        return(
		    <div className="MostInvestedStartupsRow">
				<div className="name">{this.props.name}</div>
				<div className="amount">{this.props.amount}</div>
		    </div>
        );
	};
};