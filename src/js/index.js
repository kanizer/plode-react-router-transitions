/**
 * index
 * @desc Configure application routes.
 */
import React                                      from 'react';
import { render }                                 from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Container                                  from './container';
import ViewA                                      from './components/viewA.js';
import ViewB                                      from './components/viewB.js';
import Nested                                     from './components/nested.js';
import '../scss/index.scss';

const app = (
  <Router history={ hashHistory }>
    <Route path="/" component={ Container }>
      <IndexRoute component={ ViewA }/>
      <Route path="/a" component={ ViewA }>
        <Route path="/a/:key" component={ Nested }/>
      </Route>
      <Route path="/b" component={ ViewB } />
    </Route>
  </Router>
);

render(app, document.getElementById('app'));
