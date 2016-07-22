/**
 * transitions.transitioncontroller
 * @desc Manage state of transition for all related components.
 */
import { rafUpdate } from '../utils/rafpolyfill';

let subscribers = [];

export default class TransitionController {

  static _dispatchTransitionState(type, id) {
    Object.keys(subscribers)
    .map(subId => subscribers[subId])
    .filter(sub => sub.key === type)
    .forEach(s => {
      s.cb(id); // dunno if the id is even necessary
    });
  }

  static startTransition(id, type = 'fade') {
    TransitionController._dispatchTransitionState('start', id);
    TransitionController._animate(id, type);
  }

  static concludeTransition(id) {
    TransitionController._dispatchTransitionState('conclude', id);
  }

  // TODO - add validation for duplicate keys, etc...
  static listen(sub) {
    // {id, key, cb}
    if(Object.keys(subscribers).indexOf(sub.id) === -1) {
      subscribers[sub.id] = sub;
    }
  }

  static forget(id) {
    delete subscribers[id];
  }

  static _animate(id, type, cnt = 0) {
    console.log('transitioncontroller.js: id, type:', id, type, cnt);

    cnt++;

    rafUpdate( () => TransitionController._animate(id, type, cnt) );
  }

  static _tick(time, ...rest) {
    console.log('transitioncontroller.js: time:', time, rest);
    rafUpdate(TransitionController._animate.bind(rest));
  }

}



// transitioncontroller.js:57 transitioncontroller.js: time: undefined [1, 2206.5290000027744]
// transitioncontroller.js:42 transitioncontroller.js: id, type: 2206.5290000027744 undefined
// transitioncontroller.js:42 transitioncontroller.js: id, type: 2223.2089999997697 undefined
// transitioncontroller.js:57 transitioncontroller.js: time: undefined [1, 2223.2089999997697]
// transitioncontroller.js:57 transitioncontroller.js: time: undefined [1, 2239.889000000403]
// transitioncontroller.js:42 transitioncontroller.js: id, type: 2239.889000000403 undefined
// transitioncontroller.js:42 transitioncontroller.js: id, type: 2256.5690000010363 undefined
// transitioncontroller.js:57 transitioncontroller.js: time: undefined [1, 2256.5690000010363]
// transitioncontroller.js:57 transitioncontroller.js: time: undefined [1, 2273.2490000016696]
// transitioncontroller.js:42 transitioncontroller.js: id, type: 2273.2490000016696 undefined
// transitioncontroller.js:42 transitioncontroller.js: id, type: 2289.929000002303 undefined