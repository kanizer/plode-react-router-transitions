"use strict";

import React from 'react';
import { Link } from 'react-router';

// data
import data from '../../scripts/data.js';

// utils
import utils from '../../scripts/utils.js';


let Packery = require('react-packery-component')(React);

let packeryOptions = {
	// options
	itemSelector: '.grid-item',
	columnWidth: '.grid-sizer',
	percentPosition: true,
	initLayout: false,
	transitionDuration: '0.5s',
	gutter : 0
};

export default class Gallery extends React.Component {

	constructor() {
		super();
	}

	_handleLayoutComplete() {
		// if (window.innerWidth >= 768) { utils.onLayout(); }
		utils.onLayout();
		// console.log('>>>>>>>>>>>>>>>>>>>>>>>> THIS GETS CALLED WHEN PACKERY TELLS IT TO!!!');
	}

	componentDidMount() {
		// TODO - whyd does this event handler fire so many times?
		this.packery.on('layoutComplete', this._handleLayoutComplete);
		this._handleResize();
	}

	_handleResize() {
		let self = this;

		const resizeFunc = utils.debounce(function() {
			if (window.innerWidth >= 768) {
				self.packery.layout();
			}
		}, 500);

		// ghetto listener check
		if(window.davidtAppListeners && !window.davidtAppListeners.resize) {
			window.davidtAppListeners.resize = true;
			window.addEventListener('resize', resizeFunc);
		}
	}



	render() {
		"use strict";

		let items = this.props.data.map((item, index) => {
			return (
				<Link key={index} to={{pathname: `/work/${item.id}`}} className={item.doublewidth ? 'grid-item grid-item--width2' : 'grid-item'}>
					<img src={`/assets/projects/@1x/${item.image}`} alt={item.title} />

					<div className="content">
						<div className="cornertriangle"></div>
						<div className="content-meta">
							<p className="label-client"><span className="label">CLIENT :</span>  {item.client}</p>
							<p className="label-agency"><span className="label">AGENCY :</span>  {item.agency}</p>
						</div>
						<div className="content-project">
							<h2 className="item-heading">{item.title}</h2>
							<p className="item-copy">{item.desc}</p>
						</div>
					</div>
				</Link>
			);
		});

		return(
			<Packery
				className={'grid'} // default ''
				elementType={'div'} // default 'div'
				options={packeryOptions} // default {}
				disableImagesLoaded={false} // default false
				updateOnEachImageLoad={false}
				ref={ c => { this.packery = c ? c.packery : null } }
			>
				<div className="grid-sizer"></div>
				{items}
			</Packery>
		);
	}
}
