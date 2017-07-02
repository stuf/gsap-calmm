import { flatMapLatest as ap, lift } from 'karet.util';

const maybe = fn => x => x && fn(x);
const liftMaybe = maybe(lift);
const apMaybe = maybe(ap);

// fromA :: Node -> Number -> VarsRec -> Timeline -> Timeline
export const fromA = (target, dur, vars) => tl => target.map(t => tl.from(t, dur, vars));

export const stagger = (...args) => apMaybe(tl => tl.stagger(...args));
export const staggerFrom = (...args) => apMaybe(tl => tl.staggerFrom(...args));
export const staggerTo = (...args) => apMaybe(tl => tl.staggerTo(...args));
