/**
 * components.transitionanimation
 * - animate a screen wipe to accompany route transitions
 */
import React, { Component, PropTypes } from 'react';

const dur = 0.3;
const del = 0.1;

export default class TransitionAnimation extends Component {

    constructor() {
        super();
        this.state = { tickLight: 0, tickDark: 0 };
    }

    componentWillReceiveProps(newProps) {
        const { showTransition } = newProps;
        if(showTransition) {
            this.animate();
        }
    }

    // animate halfway
    animate() {
        let tarLight = { val: 0 };
        let tarDark = { val: 0 };

        TweenMax.staggerTo([tarDark, tarLight], dur, {
            val: 0.5,
            ease: Power2.easeInOut,
            onUpdate: () => this.setState({
                tickLight: tarLight.val,
                tickDark: tarDark.val
            }),
            onComplete: () => {
                this.finishAnimation(tarLight, tarDark);
            }
        }, del);
    }

    // trigger transition between routes behind the page wipe
    finishAnimation(tarLight, tarDark) {
        // this controller stuff should be replaced by general
        // state management like flux or redux or whatever
        // global application state you want to coordinate things
        const { controller } = this.props;
        controller.concludeTransition('trans-start');
        controller.forget('trans-start');

        // animate out
        TweenMax.staggerTo([tarLight, tarDark], dur, {
            val: 1,
            ease: Power4.easeIn,
            onUpdate: () => this.setState({
                tickLight: tarLight.val,
                tickDark: tarDark.val
            }),
            onComplete: () => this.setState({
                tickLight: 0, tickDark: 0
            })
        }, del);
    }

    // get value at percentage pos within
    getRangeValue(min, max, per) {
        const length = max - min;
        return min + per * length;
    }

    render() {
        const { controller } = this.props;
        controller.listen({ id: 'trans-start', key: 'start', cb: this.animate.bind(this) });

        const { tickLight, tickDark } = this.state;
        const styleContainer = {
            display: tickLight > 0 ? 'block' : 'none'
        };

        // TODO - need to auto-prefix styles (ie. transform --> -webkit-transform for safari)
        // ranges determined by height of sass definitions
        const styleDark = {
            transform: `translateY(${this.getRangeValue(-100, 100, tickDark)}%)`,
            '-webkit-transform': `translateY(${this.getRangeValue(-100, 100, tickDark)}%)`
        };

        const styleLight = {
            transform: `translateY(${this.getRangeValue(-100, 100, tickLight)}%)`,
            '-webkit-transform': `translateY(${this.getRangeValue(-100, 100, tickLight)}%)`
        }

        return <div className="route-transition-container" style={styleContainer}>
            <div className="route-transition-item route-transition-item-dark" style={styleDark}></div>
            <div className="route-transition-item route-transition-item-light" style={styleLight}></div>
        </div>;
    }

}

TransitionAnimation.propTypes = {
    controller: PropTypes.func
};
