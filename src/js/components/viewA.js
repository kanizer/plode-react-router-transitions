// TODO - make/use TransitionComposer
/**
* components.viewA
* @desc Top level component route A.
*/
import React          from 'react';
import TransitionItem from '../transitions/transitionitem';

export default class ViewA extends TransitionItem {

  render () {
    // applying transitionProps as an example....
    const { transitionProps } = this.state;

    return (
      <div className="component-container a" style={ transitionProps }>
        { this.props.children || 'A Page' }
      </div>
    );
  }

}
