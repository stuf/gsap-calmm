import React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import { Elastic } from 'gsap';

import { master as masterTimeline } from './common/timelines';
import { LiftedUnits as Units } from './anima/lifted';
import { Timeline as TL } from './anima/helpers';
import './App.css';

// Timeline

const { events, timeline } = masterTimeline;
const { pct } = Units;

// Utilities

const toFixed = (v, ds = 1) => v.toFixed(ds);
const toPct = R.compose(toFixed, R.multiply(100));

//

const applyAnimation = el =>
  U.seq(timeline,
        TL.from(el, 1.75, { left: Units.pct(10), ease: Elastic.easeOut }),
        TL.to(el, 1.25, { top: Units.pct(10), ease: Elastic.easeOut }, '-=0.75'),
        TL.to(el, 1, { scale: 1.5, top: Units.pct(50), ease: Elastic.easeOut }, '-=1'),
        TL.to(el, 1, { scale: 3, ease: Elastic.easeOut, delay: 1 }, '-=0.5'),
        TL.to(el, 1, { rotation: '+=180', ease: Elastic.easeOut }));

const events$ = events.filter(R.whereEq({ type: 'onUpdate' }));

const progress$ =
  U.seq(K(events$, timeline, (_, tl) => tl.progress()),
        U.lift1Shallow(toPct));

//

const App = ({ el = U.variable() }) =>
  <div className="app">
    <div className="wrapper">
      <div className="box">
        <div className="smallbox"
             ref={U.refTo(el)} />
        {U.sink(applyAnimation(el))}

        <div className="controls">
          <div className="tl-progress">
            Timeline progress:
            <code className="tl-progress-count">
              {Units.pct(progress$)}
            </code>
          </div>
        </div>
        <div className="tl-progressbar">
          <div className="indicator"
               style={{ left: pct(progress$) }} />
          <hr />
        </div>
      </div>
    </div>
  </div>;

export default App;
