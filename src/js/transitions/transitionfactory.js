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
    transition
  } = props;

  return (
    <TransitionGroup { ...{ component, className } }>
      {
        cloneElement(children, {
          key: pathname,
          routeKey: pathname,
          controller,
          transition
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
  transition: PropTypes.string
};

TransitionFactory.defaultProps = {
  component: 'div',
  transition: 'fade'
};

export default TransitionFactory;
