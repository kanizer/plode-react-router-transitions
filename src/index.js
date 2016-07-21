require('./styles/index.scss');
// require('./index.html');

// // data
// import data from './scripts/data.js';

// // utils
// import utils from './scripts/utils.js';

// // react components pages
// import Work from './scripts/components/work.js';
// import Info from './scripts/components/info.js';
// import Detail from './scripts/components/detail.js';


// React
import React      from 'react';
import { render } from 'react-dom';
import {
  Router,
  Route,
  hashHistory,
  Link,
  IndexRoute
}                 from 'react-router';

import Layout from './scripts/layout';

const app = <div>hello</div>;
// const app = (
// 	<Router history={hashHistory}>
// 		<Route path="/" component={Layout}>
// 			<IndexRoute component={Work}/>
// 			<Route path="/work" component={Work}>
// 				<Route path="/work/:workId" component={Detail}/>
// 			</Route>
// 			<Route path="/info" component={Info} />
// 		</Route>
// 	</Router>
// );

render(app, document.getElementById('app'));
