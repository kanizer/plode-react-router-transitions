/**
 * container
 * @desc Wrap routes with TransitionGroup.
 */
import React, { Component, PropTypes } from 'react';
import { Link, IndexLink }             from 'react-router';
import TransitionGroup                 from 'react-addons-transition-group';
import TransitionAnimation             from './transitions/transitionanimation';
import TransitionController            from './transitions/transitioncontroller';

export default class Container extends Component {

  render() {
    const { children, location } = this.props;
    const { pathname } = location;

    return (
      <div className="container-main">

        { /* Navigation block */ }
        <nav className="nav-main">
          <ul>
            <li>
              <IndexLink to="/" className="nav-link" activeClassName="active" data-label="a">A</IndexLink>
            </li>
            <li>
              <Link to="/b" className="nav-link" activeClassName="active" data-label="b">B</Link>
            </li>
          </ul>
        </nav>

        <TransitionGroup component="div" className="transition-group-container">
          { // need to pass key or children don't get tracked properly
            React.cloneElement(children, {
              key: pathname,
              routeKey: pathname,
              controller: TransitionController
            })
          }
        </TransitionGroup>

        { /* Optional animation overlay component */ }
        <TransitionAnimation controller={ TransitionController } />

      </div>
    );
  }

}

Container.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
};
