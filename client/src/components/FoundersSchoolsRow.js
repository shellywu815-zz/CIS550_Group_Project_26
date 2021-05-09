import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FoundersSchoolsRow extends React.Component {
	render() {
		return (
			<div className="foundersSchools">
			    <div className="institution">{this.props.institution}</div>
				<div className="i_amount">{this.props.i_amount}</div>
				
			</div>
		);
	};
};