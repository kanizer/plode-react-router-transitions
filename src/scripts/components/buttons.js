"use strict";

import React from 'react';
import {render} from 'react-dom';
import FileInput from 'react-file-input';

export default class Buttons extends React.Component {

	constructor() {
	    super();

	}

	render() {
		"use strict";

	    return(
	    	<div className="row">
		        <div className="column-6 column-medium-12">
		            <div className="uploader">
						Upload Image
						<FileInput name="myImage"
							   accept=".png,.gif,.jpg,.jpeg"
			                   placeholder="My Image"
			                   className="file-upload" 
			                   type='file' 
			                   onChange={this._handleChange.bind(this)} />
				        
					</div>
		        </div>
		        <div className="column-6 column-medium-12">
		        	<input type="button" id="btnSave" className="save-button" value="Save PNG" onClick={this._saveImage.bind(this)} />
		        </div>
		    </div>
	    );
	}

	_handleChange(event) {
		if (event.target.files[0]) {

			document.getElementById('bgImg').onload = () => {
				// RESIZE THE IMAGE
			};

			let reader = new FileReader();
			reader.onload = this._imageIsLoaded.bind(this);
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	_imageIsLoaded(event) {
		let bgImageEl = document.getElementById('bgImg');
		bgImageEl.setAttribute('src', event.target.result);
	}

	_saveImage() {

		const dataRef = this.props.data;

		html2canvas(document.querySelector('.image-capture'), {
		    onrendered: function(canvas) {

		        document.body.appendChild(canvas);
		        // Convert and download as image 
		        Canvas2Image.saveAsPNG(canvas);
		        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

				dataRef.push({
					text: document.querySelector('.is-better').value,
					image: image
				});

				let tempCanvas = document.getElementsByTagName('canvas')[0];
				document.body.removeChild(tempCanvas);

		    }
		});
	}

}

