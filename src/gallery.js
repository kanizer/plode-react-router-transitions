"use strict";

import React from 'react';
import {render} from 'react-dom';

export default class Gallery extends React.Component {

	constructor() {
		super();
	}

	render() {
		"use strict";

		var items = this.props.data.map((item) => {
			return (
				<div key={item.key}>
					<img src={item.value.image} alt={item.value.text} />
				</div>
			);
		});

		return(
		  <div className="gallery">
			{items}
		  </div>
		);
	}

}

