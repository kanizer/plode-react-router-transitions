// TODO - make/use TransitionComposer

import React, { Component } from 'react';

import utils from '../../scripts/utils.js';

import Gallery from './gallery.js';
import Detail from './detail.js';

// data
import data from '../../scripts/data.js';
import logo from '../../scripts/logo-animation.js';

// import { withRouter, browserHistory } from 'react-router';
import TransitionItem from './transitionitem';

class Work extends TransitionItem {

	constructor() {
		super();
		this.state = {
			items: []
		};
	}

	componentWillMount() {
		this.setState({
			items: data.work
		});
	}

	componentDidMount() {

		console.log('Work page mounted');
		document.body.classList.remove('info-page', 'work-page');
		document.body.classList.add('work-page');

		utils.setupLogo();

	}

	_handleclick(e) {

		e.preventDefault();

		utils.setWorkToTop();

		this._addActiveClass(e.target);
		this.filter = e.target.dataset.filter;

		let workItems = data.work;
		let newWorkItems = workItems.filter(this._matchesFilter.bind(this));

		this.setState({
			items: newWorkItems
		});
		
	}

	_addActiveClass(clickedEl) {
		let navEls = document.querySelectorAll('.filter-item');
		for(let i=0; i < navEls.length; i++) {
			navEls[i].children[0].classList.remove('active')
		}
		clickedEl.classList.add('active');
	}

	_matchesFilter(obj) {
		for(let i = 0; i < obj.tags.length; i++) {
			if (obj.tags[i] === this.filter || this.filter === "all") {
				return true;
			}
		}
	}

	componentWillUnmount() {
		utils.onUnLayout();

	}

	render () {
		// applying transitionProps as an example....
		const { transitionProps } = this.state;

		return (

		<div className="work-component-container" style={transitionProps}>

			<section className="main-header">
				
				<div id="header_middle_bg" className="header_gradient"></div>

				<div className="container">
				
					<div className="main-header-top">
						<div id="site_logo_light" className="logo"></div>
					</div>

					<div id="header_diagonal_lines_container"> 
					  <svg overflow="visible" height="593">
						<g transform="rotate(45)">
							<rect width=".15" height="930" style={{fill:'#2d4550'}} transform="translate(-.1,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-10,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-12.8,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-22.7,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-25.6,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-35.5,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-38.2,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-47.5,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-50.3,0)"></rect>
							<rect width=".15" height="930" style={{fill:'#2b2630'}} transform="translate(-59.5,0)"></rect>
						</g>
					  </svg>
					</div>

					<div id="reel_preview_video">
						<video width="630" height="252" autoPlay loop poster="/assets/reel_preview_poster.jpg">
							<source src="/assets/reel_preview.mp4" type="video/mp4"></source>
						</video>
					</div>

					<div className="content">
						<h1 className="content-heading">Purveyor of finely-crafted digital display advertising <span className="highlight">– for nearly two decades.</span></h1>
						<p className="content-copy">Davi-T LLC specializes in creative production for online advertising, successfully executing many standard and rich media banner campaigns for a wide range of industries, premium brands, direct clients, and leading advertising agencies.</p>
					</div>

					<div className="viewwork">
						<p className="viewwork-copy">View work</p>
						<svg className="viewwork-icon" width="11px" height="6px" viewBox="0 0 11 6">
							<g id="arrow_11x6" style={{fill:'#5F5666'}}>
								<rect width="1" height="1" x="0"  y="0"></rect>
								<rect width="1" height="1" x="1"  y="1"></rect>
								<rect width="1" height="1" x="2"  y="2"></rect>
								<rect width="1" height="1" x="3"  y="3"></rect>
								<rect width="1" height="1" x="4"  y="4"></rect>
								<rect width="1" height="1" x="5"  y="5"></rect>
								<rect width="1" height="1" x="6"  y="4"></rect>
								<rect width="1" height="1" x="7"  y="3"></rect>
								<rect width="1" height="1" x="8"  y="2"></rect>
								<rect width="1" height="1" x="9"  y="1"></rect>
								<rect width="1" height="1" x="10" y="0"></rect>
							</g>
						</svg>
					</div>

				</div>

				<div id="header_grain"></div>

			</section>

			<section className="work">
				<div id="work_background_grain"></div>
				<div className="container work-component-container">
					<nav className="filter">
						<div className="label">Filter 
							<svg className="filter-icon" width="11px" height="6px" viewBox="0 0 11 6">
								<g id="arrow_3x5" style={{fill:'#19d9e5'}}>
									<rect width="1" height="1" x="0" y="0" style={{fill:'#19d9e5'}}></rect>
									<rect width="1" height="1" x="1" y="1" style={{fill:'#19d9e5'}}></rect>
									<rect width="1" height="1" x="2" y="2" style={{fill:'#19d9e5'}}></rect>
									<rect width="1" height="1" x="1" y="3" style={{fill:'#19d9e5'}}></rect>
									<rect width="1" height="1" x="0" y="4" style={{fill:'#19d9e5'}}></rect>
									<rect className="middle_px" width="1" height="1" x="0" y="2" style={{fill:'#19d9e5'}}></rect>
								</g>
							</svg>
						</div>
						<ul>
							<li className="filter-item"><a href="" className="active" data-filter="all" onClick={this._handleclick.bind(this)}>All</a></li>
							<li className="filter-item"><a href="" data-filter="standard" onClick={this._handleclick.bind(this)}>Standard</a></li>
							<li className="filter-item"><a href="" data-filter="richmedia" onClick={this._handleclick.bind(this)}>Rich Media</a></li>
							<li className="filter-item"><a href="" data-filter="video" onClick={this._handleclick.bind(this)}>Video</a></li>
						</ul>
					</nav>
					<div className="grid-container">
						<Gallery data={this.state.items}></Gallery>
					</div>

				</div>
			</section>

			{this.props.children || "Detail Page"}

		</div>

		);
	}
}

export default Work
