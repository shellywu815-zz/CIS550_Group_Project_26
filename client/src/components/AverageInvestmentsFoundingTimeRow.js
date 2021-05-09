import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AverageInvestmentsFoundingTimeRow extends React.Component {
	render() {
		return (
			<div className="AverageInvestmentsFoundingTimeRow">
			    <div className="inverted">{this.props.inverted}</div>
				<div className="average_total_inv">{this.props.average_total_inv}</div>
                <div className="num_founded">{this.props.num_founded}</div>
				
			</div>
		);
	};
};