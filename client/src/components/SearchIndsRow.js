import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SearchComRow extends React.Component {
	render() {
		return (
			<div className="IndMatches">
				<div className="name"><a href={"http://localhost:3000/industry/" + this.props.name}>{this.props.name}</a></div>
				<div className="total">{this.props.total}</div>
				<div className="number">{this.props.number}</div>
			</div>
		);
	};
};
