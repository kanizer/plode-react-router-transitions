/**
 * transitions.transitioncontroller
 * @desc Manage state of transition for all related components.
 */
import { rafUpdate } from '../utils/rafpolyfill';
import PresetFade from './presets/presetfade';

const presets = {
  fade: PresetFade
};
let subscribers = {};

export default class TransitionController {

  static _dispatchTransitionState(key, id, state) {
    TransitionController.getSubscribers(key, id)
    .forEach(s => {
      s.onComplete(id, state); // dunno if the id is even necessary
    });
  }

  static _animate(options, cnt = 0) {
    const { key, id, preset, duration, ease } = options;

    TransitionController._dispatchTick(options, cnt);

    return (cnt < duration) // rough approximation of RAF unit to ms
      ? rafUpdate( () => TransitionController._animate(options, cnt + 1) )
      : TransitionController.concludeTransition(key, id, presets[preset].getFinalState(options));
  }

  // convert tick into appropriate value object
  static _dispatchTick(options, cnt = 0) {
    const { key, id, preset } = options;
    const tweenValues = presets[preset].convertTick(options, cnt);

    TransitionController.getSubscribers(key, id)
    .forEach(s => {
      s.onUpdate(tweenValues); // dunno if the id is even necessary
    });
  }

  static getSubscribers(key, id) {
    return Object.keys(subscribers)
    .map(subId => subscribers[subId])
    .filter(sub => sub.key === key);
  }

  static startTransition(options) {
    const { id, key, preset, duration, ease } = options;
    TransitionController._animate({ id, key, preset, duration, ease });

    return presets[preset].getInitialState(options);
  }

  static concludeTransition(key, id, state) {
    TransitionController._dispatchTransitionState(key, id, state);
  }

  // TODO - add validation for duplicate keys, etc...
  static listen(options) {
    const { id } = options;
    if(Object.keys(subscribers).indexOf(id) === -1) {
      subscribers[id] = options;
    }
  }

  static forget(id) {
    delete subscribers[id];
  }

}
