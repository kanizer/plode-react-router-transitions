"use strict";

import React from 'react';

// data
import data from '../../scripts/data.js';
import logo from '../../scripts/logo-animation.js';

import utils from '../../scripts/utils.js';
import TransitionItem from './transitionitem';

export default class Info extends TransitionItem {

	constructor() {
		super();

		this.state = {
			info: []
		};
	}

	componentWillMount() {
		this.setState({
			info: data.info,
			methods: data.info[0].contactmethods,
			clients: data.info[1].clients,
			brands: data.info[2].brands
		});
	}

	componentDidMount() {

		document.body.scrollTop = 0;
		document.body.classList.remove('info-page', 'work-page');
		document.body.classList.add('info-page');

		utils.setupLogo();

		this._handleResize();

	}

	_handleResize() {

	}

	render () {

		let methods = this.state.methods.map((method, index) => {
			return (
				<li key={index}>
					<p className="methods-label">{method.label}
						<svg className="label-icon" width="11px" height="6px" viewBox="0 0 11 6">
							<g id="arrow_3x5">
								<rect width="1" height="1" x="0" y="0"></rect>
								<rect width="1" height="1" x="1" y="1"></rect>
								<rect width="1" height="1" x="2" y="2"></rect>
								<rect width="1" height="1" x="1" y="3"></rect>
								<rect width="1" height="1" x="0" y="4"></rect>
								<rect className="middle_px" width="1" height="1" x="0" y="2"></rect>
							</g>
						</svg>
					</p>
					<p className="methods-content">{method.content}</p>
				</li>
			);
		});

		let clients = this.state.clients.map((client, index) => {
			return (
				<li key={index}>
					<p>
						{client.agency} <span className="location">{client.location}</span>
					</p>
				</li>
			);
		});

		let brands = this.state.brands.map((brand, index) => {
			return (
				<li key={index}>
					<img src={`/assets/brands/@1x/${brand.image}`} alt={brand.alt} />
				</li>
			);
		});

		// applying transitionProps as an example....
		const { transitionProps } = this.state;

		return (
			<div className="info-component-container" style={transitionProps}>
				<div className="info">
					<div className="header">
						<div className="main-header-top container">
							<div id="site_logo_light" className="logo"></div>
						</div>
					</div>
					<div className="content container">

						<section className="contact">
							<p className="label">Contact Information</p>
							<h1 className="contact-content">For all enquiries, be it new business, old business, good feedback, bad feedback, or a simple hello <span className="highlight">– please use one of the following methods:</span></h1>
							<ul className="methods">
								{methods}
							</ul>
						</section>

						<section className="clients">
							<p className="label">Past & Present Clients</p>
							<ul>
								{clients}
							</ul>
						</section>

						<section className="brands">
							<p className="label">Brands</p>
							<ul>
								{brands}
							</ul>
						</section>

					</div>

				</div>
			</div>
		);
	}
}
