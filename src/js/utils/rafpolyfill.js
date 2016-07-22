/**
 * utils.rafpolyfill
 * @desc Initiate raf functions.
 */
const RAF = () => {
  if(!window['plode-react-router-transition-raf-init']) {
    window['plode-react-router-transition-raf-init'] = true;

    let lastTime = 0;
    const vendors = ['webkit', 'moz'];
    for(let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      let e = vendors[i];
      if(window.requestAnimationFrame) {
        return false;
      }
      window.requestAnimationFrame = window[`${e}RequestAnimationFrame`];
      window.cancelAnimationFrame = window[`${e}CancelAnimationFrame`] || window[`${e}CancelRequestAnimationFrame`];
    }

    if(!window.requestAnimationFrame) {
      window.requestAnimationFrame = (callback, element) => {
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0, 16 - (currTime - lastTime));
        let id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);

        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = id => clearTimeout(id);
    }
  }

  return { req: window.requestAnimationFrame, cancel: window.cancelAnimationFrame };
};

export function rafUpdate(f) {
  const { req, cancel } = RAF();
  req(f);
}

export default RAF;
