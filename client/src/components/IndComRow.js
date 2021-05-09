import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndComRow extends React.Component {
	render() {
		return (
			<div className="IndComs">
				<div className="name"><a href={"http://localhost:3000/startup/" + this.props.id}>{this.props.name}</a></div>
				<div className="founded">{this.props.founded}</div>
				<div className="total">{this.props.total}</div>
				<div className="number">{this.props.number}</div>
			</div>
		);
	};
};
