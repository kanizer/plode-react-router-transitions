/**
* components.nested
* @desc Nested level component route.
*/
import React, { Component } from 'react';
import transitionComposer   from '../transitions/transitioncomposer';

const Nested = transitionComposer(class extends Component {

  render() {
    return (
      <div className="component-container nested"></div>
    );
  }

});

export default Nested;
