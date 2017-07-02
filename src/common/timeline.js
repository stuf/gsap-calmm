import {
  lift,
  lift1,
  lift1Shallow,
  liftStaged,
  construct
} from 'karet.util';
import * as R from 'ramda';
import { TimelineMax } from 'gsap';

export const create = construct(TimelineMax);
export const createNew = vars => new TimelineMax(vars);
export const seq = tl => (...fns) => R.pipe(...fns)(tl);
export const from = (...args) => tl => tl.from(...args);
export const fromU = (...args) => lift1(tl => tl.from(...args));

// Playback methods

export const pause = lift1Shallow(tl => tl.pause());
export const stop = lift1Shallow(tl => tl.stop());
export const restart = lift1Shallow(tl => tl.restart());
export const play = speed => lift1(tl => tl.play(speed));
export const seek = where => lift1(tl => tl.seek(where));
export const reverse = () => lift1Shallow(tl => tl.reverse());
export const timeScale = scale => lift1(tl => tl.timeScale(scale));
export const progress = time => lift1(tl => tl.progress(time));
