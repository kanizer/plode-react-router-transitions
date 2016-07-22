/**
 * transitions.transitioncomposer
 * @desc Applies transition lifecycle events.
 * This is basically just a reference to the available transition hooks
 * that will be applied in a TransitionGroup.
 */
import React, { Component, PropTypes } from 'react';
import TransitionController            from './transitioncontroller';

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
    const { routeKey, controller } = this.props;
    const c = controller || TransitionController;
    const id = routeKey + '-enter';
    const key = 'start';

    this.initTransition(c, id, key, done);
  }

  componentDidEnter() {
    const { controller, routeKey } = this.props;
    controller.forget(routeKey + '-enter');
  }

  componentWillLeave(done) {
    const { routeKey, controller } = this.props;
    const c = controller || TransitionController;
    const id = routeKey + '-leave';
    const key = 'end';

    this.initTransition(c, id, key, done);
  }

  componentDidLeave() {
    const { controller, routeKey } = this.props;
    controller.forget(routeKey + '-leave');
  }

  // callback from TransitionController
  onUpdate(options) {
    this.setState({ transitionProps: options });
  }

  initTransition(c, id, key, done) {
    const { preset, duration, ease } = this.props;
    c.listen({
      id,
      key,
      onUpdate: this.onUpdate.bind(this),
      onComplete: (id, style) => {
        // this.setState({ transitionProps: style });
        done();
      }
    });

    this.setState({
      transitionProps: c.startTransition({ id, key, preset, duration, ease })
    });
  }

  render() {
    const { transitionProps } = this.state;
    return <ComposedComponent { ...this.props } { ...{ transitionProps } } />;
  }

};

// just for reference
const propTypes = {
  routeKey: PropTypes.string.isRequired,
  controller: PropTypes.func,
  preset: PropTypes.string,
  duration: PropTypes.number,
  ease: PropTypes.string
};

export default transitionComposer;
