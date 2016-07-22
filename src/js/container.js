/**
 * container
 * @desc Wrap routes with TransitionGroup.
 */
import React, { Component, PropTypes } from 'react';
import { Link, IndexLink }             from 'react-router';
import TransitionFactory               from './transitions/transitionfactory';
import TransitionController            from './transitions/transitioncontroller';

export default class Container extends Component {

  render() {
    const { children, location } = this.props;
    const { pathname } = location;

    return (
      <div className="container-main">

        { /* Navigation block */ }
        <nav className="nav nav-main">
          <ul>
            <li>
              <IndexLink to="/a" className="nav-link" activeClassName="active" data-label="a">A</IndexLink>
            </li>
            <li>
              <Link to="/b" className="nav-link" activeClassName="active" data-label="b">B</Link>
            </li>
          </ul>
        </nav>

        {/*
          - children & pathname are required
          - controller will override presets
          - preset keys: fade[, slide, pop]
          - duration in relative unit of RAF ticks
        */}
        <TransitionFactory component="div"
          className="transition-group-container"
          preset="fade"
          duration={ 4000 }
          ease={ 'easeInOut' }
          controller={ TransitionController }
          pathname={ pathname }
        >
          { children }
        </TransitionFactory>

      </div>
    );
  }

}

Container.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
};
