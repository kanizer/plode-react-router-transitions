/**
 * transitions.transitioncomposer
 * @desc Applies transition lifecycle events.
 * This is basically just a reference to the available transition hooks
 * that will be applied in a TransitionGroup.
 */
import React, { Component } from 'react';
import TransitionController from './transitioncontroller';

const transitionComposer = ComposedComponent => class extends Component {

  constructor() {
    super();

    this.state = { transitionProps: { display: 'block' } };
  }

  // TODO - optional mount transition
  componentWillAppear(done) {
    // initial mount only
    done();
  }

  componentDidAppear() {}

  componentWillEnter(done) {
    const { transition, controller, routeKey } = this.props;
    const c = controller || TransitionController;

    c.startTransition(routeKey, transition);
    c.listen({ id: routeKey + '-enter', key: 'conclude', cb: done });

    // this.setState({ transitionProps: { display: 'none' } });
    this.setState({ transitionProps: c.startProps });
  }

  componentDidEnter() {
    // const { controller, routeKey } = this.props;
    // controller.forget(routeKey + '-enter');

    this.setState({ transitionProps: { display: 'block' } });
  }

  componentWillLeave(done) {
    // const { controller, routeKey } = this.props;
    // controller.listen({ id: routeKey + '-leave', key: 'conclude', cb: done });

    this.setState({ transitionProps: { display: 'block' } });
    done();
  }

  componentDidLeave() {
    // const { controller, routeKey } = this.props;
    // controller.forget(routeKey + '-leave');

    this.setState({ transitionProps: { display: 'none' } });
  }

  render() {
    const { transitionProps } = this.state;
    return <ComposedComponent { ...this.props } { ...{transitionProps} } />;
  }

};

export default transitionComposer;
