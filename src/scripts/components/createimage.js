"use strict";

import React from 'react';
import {render} from 'react-dom';

import ReactFitText from 'react-fittext';

export default class CreateImage extends React.Component {

	constructor() {
	    super();
	}

	componentDidMount() {

		window.requestAnimationFrame(() => {
			let anythingInput = document.querySelector('.is-better');
			if (anythingInput !== undefined) {
				anythingInput.focus();
				anythingInput.onfocus = () => {
				    if (anythingInput.value === 'Anything') {
				    	anythingInput.defaultValue = '';
				    }
				    
				};
				anythingInput.onblur = () => {
					console.log(anythingInput.value);
					if (anythingInput.value === '' || anythingInput.value === ' ') {
						anythingInput.defaultValue = 'Anything';	
					}
				}; 	
			}
		});

	}

	render() {
		"use strict";

	    return(
	    	<div className="row">
		        <div className="image-capture">
					<img src="/assets/trump1.png" id="bgImg" alt="user image" width="400" height="400" />
					<div className="overlay"></div>
					<hgroup>
						<form>
							<input type="text" className="is-better" onChange={this._handleTypeChange.bind(this)} />
						</form>
						<img src="/assets/trump-logo.svg" alt="Anything is Better" className="logo" />
					</hgroup>
				</div>
			</div>
	    );
	}

	_handleTypeChange() {

		var x = document.querySelector('.is-better');
		var typeLength = x.value.length;
		var initialSize = 90;

		console.log(typeLength);

		if (typeLength >= 36) {
			alert("Pick something shorter! That's too many characters.");
		}

		if (typeLength >= 7) {
			initialSize = 90 - (x.value.length*3.6);	
		}

	    console.log('initialSize before condish', initialSize);

	    initialSize = initialSize <= 20 ? 20 : initialSize;
	    if (typeLength >= 30) {
	    	initialSize = 30 - (typeLength*2.8);
	    	initialSize = initialSize <= 15 ? 15 : initialSize;
	    }

		x.style.fontSize = initialSize + "px";
	}

}

