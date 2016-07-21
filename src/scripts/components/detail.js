"use strict";

import React from 'react';
import { Link } from 'react-router';

import data from '../data.js';

export default class Detail extends React.Component {

	constructor() {
		super();

		let nextPrev = this._findNextPrev(data.work[0].id);

		this.state = {
			workItem: data.work[0],
			nextprev: nextPrev
		};
	}

	componentWillReceiveProps(props) {

		let workItem = this._findWorkById(props.params.workId);
		this.setState({
			workItem: workItem[0],
			nextPrev: this._findNextPrev(props.params.workId)
		});
	}

	_findWorkById(workId) {
		return data.work.filter((obj, index) => {
			if (obj.id === workId) {
				return true;
			}
		});
	}

	_findNextPrev(workId) {
		
		let workItems = data.work;
		let nextprev = {};

		data.work.forEach((obj, index) => {
			if (obj.id === workId) {
				nextprev.next = workItems[index + 1] ? workItems[index + 1] : workItems[0];
				nextprev.prev = workItems[index - 1] ? workItems[index - 1] : workItems[workItems.length - 1];
			} 
		});

		return nextprev;
	}

	_function() {

	}

	componentWillMount() {

		let workItem = this._findWorkById(this.props.params.workId);

		this.setState({
			workItem: workItem[0],
			nextPrev: this._findNextPrev(this.props.params.workId)
		});
	}

	render() {

		// Get the related projects if there are any...
		let relatedProjects = [];

		if (this.state.workItem.hasrelated) {
			
			relatedProjects = this.state.workItem.relateditems.map((relatedItemId, index) => {
				
				const relatedItem = this._findWorkById(relatedItemId);
				
				return (
					<li key={index}>
						<Link to={{pathname: `/work/${relatedItem[0].id}`}}>{relatedItem[0].title}</Link>
					</li>
				);
			})
		}

		// Render the detail page modal
		return (
			<div className="modal">
				<div className="modal-interior">
					
					<img src={`/assets/projects/@1x/${this.state.workItem.image}`} alt={this.state.workItem.title} />
					
				</div>
				<div className="modal-bottom">
					<div className="col left">
						<p>Related projects:</p>
					</div>
					<div className="col middle">
						{ this.state.workItem.hasrelated ? <ul>{relatedProjects}</ul> : null }
					</div>
					<div className="col right">
						<div className="controls">
							<Link to={{pathname: `/work/${this.state.nextPrev.prev.id}`}} className="prev fa fa-angle-left"></Link> 
							<Link to={{pathname: `/work/${this.state.nextPrev.next.id}`}} className="next fa fa-angle-right"></Link> 
							<Link to={{pathname: `/`}} className="galleryClose">
								<div className="bar"></div>
								<div className="bar"></div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


// <iframe src="//player.vimeo.com/video/172650811?autoplay=1&color=19d9e5&title=0&byline=0&portrait=0" width="300" height="250" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>






