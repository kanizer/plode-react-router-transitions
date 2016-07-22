/**
* transtions.presets.presetfade
* @desc Animate an object with appropriate style.
*/
export default class PresetFade {

  static getInitialState(options) {
    const { key } = options;
    return { display: 'block' };
  }

  static getFinalState(options) {
    const { key } = options;
    return { display: !PresetFade.isStartPhase(key) ? 'block' : 'none' };
  }

  static convertTick(options, cnt = 0) {
    const {
      // ease,
      key,
      duration
    } = options;

    // get opacity along the spectrum of transitioning in or out
    const per = cnt / duration;
    const val = PresetFade.getRangeValue(0, 1, per);

    // TODO - implement ease

    return {
      opacity: PresetFade.isStartPhase(key)
        ? 1 // actually don't want to tween the bottom view leaving
        : 1 - val
    };
  }

  // TODO - put these somewhere to be inherited by all presets
  static getRangeValue(min, max, per) {
    const length = max - min;
    return min + per * length;
  }

  static isStartPhase(key) {
    return key === 'start';
  }

}
