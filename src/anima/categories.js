import { TimelineLite, TweenLite } from 'gsap';

//

/**
 * Example
 */

export const Timeline = {
  of: vars => new TimelineLite(vars),
  map: () => {},
  fmap: () => {},
  bind: () => {}
};

//

export const Tween = {
  of: (target, duration, vars) => new TweenLite(target, duration, vars),
  map: () => {},
  fmap: () => {},
  bind: () => {}
};
