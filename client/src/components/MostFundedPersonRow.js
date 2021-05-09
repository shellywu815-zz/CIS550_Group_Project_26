import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MostFundedPersonRow extends React.Component {
	render() {
		return (
			<div className="MostFundedPersonRow">
			    <div className="person_name">{this.props.person_name}</div>
				<div className="total">{this.props.total}</div>
				
			</div>
		);
	};
};