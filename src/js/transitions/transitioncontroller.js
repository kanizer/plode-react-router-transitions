/**
 * transitions.transitioncontroller
 * @desc Manage state of transition for all related components.
 */
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

  static startTransition(id) {
    TransitionController._dispatchTransitionState('start', id);
  }

  static concludeTransition(id) {
    TransitionController._dispatchTransitionState('conclude', id);
  }

  static listen(sub) {
    // {id, key, cb}
    if(Object.keys(subscribers).indexOf(sub.id) === -1) {
      subscribers[sub.id] = sub;
    }
  }

  static forget(id) {
    delete subscribers[id];
  }


  // // TODO - use RAF for transition counter
  // - fallback/polyfill required?
  //         window.requestAnimationFrame(() => {
  //             let anythingInput = document.querySelector('.is-better');
  //             if (anythingInput !== undefined) {
  //                 anythingInput.focus();
  //                 anythingInput.onfocus = () => {
  //                     if (anythingInput.value === 'Anything') {
  //                         anythingInput.defaultValue = '';
  //                     }
  //                 };
  //                 anythingInput.onblur = () => {
  //                     console.log(anythingInput.value);
  //                     if (anythingInput.value === '' || anythingInput.value === ' ') {
  //                         anythingInput.defaultValue = 'Anything';    
  //                     }
  //                 };  
  //             }
  //         });

}
