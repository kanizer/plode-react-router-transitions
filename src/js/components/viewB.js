/**
* components.viewB
* @desc Top level route component B.
*/
import React          from 'react';
import TransitionItem from '../transitions/transitionitem';

export default class ViewB extends TransitionItem {

  render() {
    // applying transitionProps as an example....
    const { transitionProps } = this.state;

    return (
      <div className="component-container b" style={ transitionProps }></div>
    );
  }

}
