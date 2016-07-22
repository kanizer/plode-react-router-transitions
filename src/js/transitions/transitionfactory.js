/**
 * transitions.transitionfactory
 * @desc Applies transition config and decorates child components with transition lifecycle hooks.
 */
import React, { cloneElement, PropTypes } from 'react';
import TransitionGroup                    from 'react-addons-transition-group';

const TransitionFactory = props => {

  const {
    children,
    pathname,
    controller,
    component,
    className,
    preset,
    duration,
    ease
  } = props;

  return (
    <TransitionGroup { ...{ component, className } }>
      {
        cloneElement(children, {
          key: pathname,
          routeKey: pathname,
          controller,
          preset,
          duration,
          ease
        })
      }
    </TransitionGroup>
  );
};

TransitionFactory.propTypes = {
  children: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  controller: PropTypes.func,
  component: PropTypes.string,
  className: PropTypes.string,
  preset: PropTypes.string,
  duration: PropTypes.number,
  ease: PropTypes.string
};

TransitionFactory.defaultProps = {
  component: 'div',
  preset: 'fade',
  duration: 0.4,
  ease: 'easeInOut'
};

export default TransitionFactory;
