/**
* components.viewA
* @desc Top level component route A.
*/
import React, { Component } from 'react';
import { Link, IndexLink }  from 'react-router';
import transitionComposer   from '../transitions/transitioncomposer';
import Nested               from './nested';

const navData = [
  { id: 'a/nest-a', label: 'Nested A' },
  { id: 'a/nest-b', label: 'Nested B' }
];

const ViewA = transitionComposer(class extends Component {

  constructor() {
    super();
  }

  getNavItems() {
    return navData.map( (navItem, i) => (
      <li key={ navItem.id + '-nested-nav-item' }>
        { (() => {
          const linkProps = {
            className: 'nav-link',
            activeClassName: 'active',
            'data-label': 'a',
            to: { pathname: `${navItem.id}` }
          };

          return (i === 0)
            ? <IndexLink { ...linkProps }>{ navItem.label }</IndexLink>
            : <Link { ...linkProps }>{ navItem.label }</Link>;
        })() }
      </li>
    ) );
  }

  render() {
    // applying transitionProps as an example....
    const { transitionProps, children } = this.props;
    // console.log('viewA.js: transitionProps:', transitionProps);

    return (
      <div className="component-container a" style={ transitionProps }>

        { /* Navigation block */ }
        <nav className="nav nav-a">
          <ul>{ this.getNavItems() }</ul>
        </nav>


      </div>
    );
  }

});

export default ViewA;
