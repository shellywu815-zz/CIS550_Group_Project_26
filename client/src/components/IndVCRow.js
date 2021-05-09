import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class IndVCRow extends React.Component {
	render() {
		return (
			<div className="IndVCs">
				<div className="name"><a href={"http://localhost:3000/vc/" + this.props.id}>{this.props.name}</a></div>
				<div className="founded">{this.props.founded}</div>
				<div className="total">{this.props.total}</div>
				<div className="number">{this.props.number}</div>
			</div>
		);
	};
};
