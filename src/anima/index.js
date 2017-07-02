/// <reference path="index.d.ts" />
import K, * as U from 'karet.util';
import * as R from 'ramda';
import { constant } from 'kefir';
import { TimelineLite } from 'gsap';

import Units from './units';
import * as H from './helpers';

const callbackTypes = ['onStart', 'onUpdate', 'onComplete', 'onReverseComplete'];

 /**
 * I'm sure this will go smoothly in the future
 * @todo Why doesn't `R.construct` work for us here, maybe `R.bind` it?
 * @deprecated
 * @param {object} vars
 */
export const makeTimeline = R.compose(U.atom, vars => new TimelineLite(vars));

//

const streamCallback = R.curry((bus, type) => () => bus.push({ type }));

const makeStreamCallbacksFor = (bus, types = [], callbackObj = {}) =>
  R.reduce((obj, type) => R.assoc(type, streamCallback(bus, type), obj),
           callbackObj,
           types);

/**
 * Create an observable timeline
 *
 * @todo How could we more flexibly specify certain functions, e.g. callback actions?
 * @param {*} vars
 */
export const makeObservableTimeline = vars => {
  const bus = U.bus();
  const events = K(bus, R.identity);
  const cbs = makeStreamCallbacksFor(bus, callbackTypes);

  const timeline = constant(new TimelineLite({ ...vars, ...cbs }));

  return { timeline, events };
}

export { H, Units };
