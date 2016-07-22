/**
* components.viewB
* @desc Top level route component B.
*/
import React, { Component } from 'react';
import transitionComposer   from '../transitions/transitioncomposer';

const ViewB = transitionComposer(class extends Component {

  render() {
    // applying transitionProps as an example....
    const { transitionProps } = this.props;

    return (
      <div className="component-container b" style={ transitionProps }></div>
    );
  }

});

export default ViewB;
