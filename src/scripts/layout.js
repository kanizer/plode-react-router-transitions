import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';
import TransitionAnimation from './components/transitionanimation';
import TransitionController from './controllers/transitioncontroller';

export default class Layout extends Component {

  render() {
    const { children, location } = this.props;
    const { pathname } = location;

    return (
      <div className="container-layout">

        {/* Navigation block */}
        <div className="fixed-container nav">
          <nav className="mainnav">
            <ul>
              <li><IndexLink to="/" className="nav-link" activeClassName="active" data-label="work" onClick={this.handleClick.bind(this)}>Work</IndexLink></li>
              <li><Link to="/info" className="nav-link" activeClassName="active" data-label="info" onClick={this.handleClick.bind(this)}>Info</Link></li>
            </ul>
          </nav>
        </div>

        <TransitionGroup component="div" className="transition-group-container">
          { // need to pass key or children don't get tracked properly
            React.cloneElement(children, {
              key: pathname,
              routeKey: pathname,
              controller: TransitionController
            })
          }
        </TransitionGroup>

        {/* Optional animation overlay component */}
        <TransitionAnimation controller={TransitionController} />

      </div>
    );
  }

}

Layout.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
};
