/**
 * components.transitionitem
 * - applies transition properties to components
 * - this is basically just a reference to the available transition hooks
 *   that will be applied in a TransitionGroup. Don't extend this
 *   class if you want unique transitions per component.
 *
 * - using a simple controller to orchestrate state between the
 *   transition items and the transition page wipe component
 */
import React, { Component, PropTypes } from 'react';

export default class TransitionItem extends Component {

    constructor() {
        super();
        // passing transitionProps via component state to
        // reflect transition phases to classes that extend this one
        this.state = { transitionProps: { display: 'block' } };
    }

    // appear events occur when initially mounted
    // - similar to componentWillMount
    componentWillAppear(done) { done(); }

    componentDidAppear() {}

    // enter and leave events occur during transitions
    componentWillEnter(done) {
        const { controller, routeKey } = this.props;
        controller.startTransition(routeKey);
        controller.listen({ id: routeKey + '-enter', key: 'conclude', cb: done });

        this.setState({ transitionProps: { display: 'none' } });
    }

    componentDidEnter() {
        const { controller, routeKey } = this.props;
        controller.forget(routeKey + '-enter');

        this.setState({ transitionProps: { display: 'block' } });
    }

    componentWillLeave(done) {
        const { controller, routeKey } = this.props;
        controller.listen({ id: routeKey + '-leave', key: 'conclude', cb: done });

        this.setState({ transitionProps: { display: 'block' } });
    }

    componentDidLeave() {
        const { controller, routeKey } = this.props;
        controller.forget(routeKey + '-leave');

        this.setState({ transitionProps: { display: 'none' } });
    }

}

TransitionItem.propTypes = {
    controller: PropTypes.func,
    routeKey: PropTypes.string // reference key for convenience
};
