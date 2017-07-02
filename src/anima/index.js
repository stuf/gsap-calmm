/// <reference path="index.d.ts" />
import * as U from 'karet.util';
import * as R from 'ramda';
import { TimelineLite } from 'gsap';

import Units from './units';
import * as H from './helpers';

/**
 * I'm sure this will go smoothly in the future
 * @todo Why doesn't `R.construct` work for us here, maybe `R.bind` it?
 * @param {object} vars
 */
export const makeTimeline =
  R.compose(U.atom, vars => new TimelineLite(vars));

export const makeObservableTimeline = vars => {
  const bus = U.bus();
  const prop = bus.toProperty(() => 0);
  const timeline = new TimelineLite({
    ...vars,
    onUpdate: () => bus.push(timeline.progress())
  });

  return U.template({
    timeline,
    bus,
    prop
  });
}

export { H, Units };
