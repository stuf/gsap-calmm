import React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import { Elastic } from 'gsap';

import './App.css';
import { master as masterTimeline } from './common/timelines';
import { LiftedUnits as Units } from './anima/lifted';
import { Timeline as TL } from './anima/helpers';

import Sidebar from './components/sidebar';

//

const { events, timeline } = masterTimeline;
const { pct } = Units;

// Utility functions

const toFixed = (v, ds = 1) => v.toFixed(ds);
const toPct = R.compose(toFixed, R.multiply(100));

//

/**
 * Apply animation on the timeline, animating an element with a sequence of tweens.
 */
const applyAnimation = el =>
  U.seq(timeline,
        TL.from(el, 1.75, { left: Units.pct(10), ease: Elastic.easeOut }),
        TL.to(el, 1.25, { top: Units.pct(10), ease: Elastic.easeOut }, '-=0.75'),
        TL.to(el, 1, { scale: 1.5, top: Units.pct(50), ease: Elastic.easeOut }, '-=1'),
        TL.to(el, 1, { scale: 3, ease: Elastic.easeOut, delay: 1 }, '-=0.5'),
        TL.to(el, 1, { rotation: '+=180', ease: Elastic.easeOut }));

/**
 * Filter out anything that's _not_ an `onUpdate` event.
 */
const events$ = events.filter(R.whereEq({ type: 'onUpdate' }));

/**
 * Combine the `events$` stream we've created with the `timeline` stream
 * to compute the progress as a percent value.
 */
const progress$ =
  U.seq(K(events$, timeline, (_, tl) => tl.progress()),
        U.lift1Shallow(toPct));

//

const App = ({
  /* Make `el` an atom without a value, which will hold the `ref` */
  el = U.variable()
}) =>
  <div className="app">
    <Sidebar />

    <section className="animation-canvas">
      <div className="wrapper">
        {/* `.smallbox` will be the element that we'll be animating
            as an example. We're using `U.refTo` to set it as the value of `el` */}
        <div className="smallbox"
             ref={U.refTo(el)} />

        {/* We're using a `sink` here, since we're not interested in
            embedding the result into the VDOM, we're only applying
            the animation on the element `el` */}
        {U.sink(applyAnimation(el))}

        {/* Top-right controls */}
        <div className="controls">
          <div className="tl-progress">
            Timeline progress:
            <code className="tl-progress-count">
              {Units.pct(progress$)}
            </code>
          </div>
        </div>

        {/* Progress bar */}
        <div className="tl-progressbar">
          <div className="indicator"
               style={{ left: pct(progress$) }} />
          <hr />
        </div>
      </div>
    </section>
  </div>;

export default App;
