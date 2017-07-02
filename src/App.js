import React from 'karet';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import K, * as U from 'karet.util';
import { Elastic, TweenLite } from 'gsap';
import './App.css';

import {
  master as masterTimeline,
  progressBar
} from './common/timelines';
import { Units } from './anima';
import { Timeline as TL } from './anima/helpers';

//

const applyAnimation = el =>
  U.seq(masterTimeline,
        U.lift(L.get('timeline')),
        TL.from(el, 1.75, { left: Units.pct(10), ease: Elastic.easeOut }),
        TL.to(el, 1.25, { top: Units.pct(10), ease: Elastic.easeOut }, '-=0.75'),
        TL.to(el, 1, { scale: 1.5, top: Units.pct(50), ease: Elastic.easeOut }, '-=1'),
        TL.to(el, 1, { scale: 3, ease: Elastic.easeOut, delay: 1 }, '-=0.5'),
        TL.to(el, 1, { rotation: '+=180', ease: Elastic.easeOut }));

/**
 * We're using `U.sink` here to enable embedding the application of
 * animation into the VDOM instead. Alternative implement
 */
const animate = R.compose(U.sink, applyAnimation);

const toFixed = v => v.toFixed(1);
const toPct = R.compose(toFixed, R.multiply(100));

const progress =
  masterTimeline.map(L.get('prop'))
                .skipWhile(R.complement(R.is(Number)))
                .debounce(60 / 16)
                .map(toPct);

const progressTimeline = el =>
  U.sink(U.seq(K(progressBar,
          progress,
          el,
          (tl, pct, el_) =>
            [tl.to(el_, 1, { left: Units.pct(pct) }), pct]).log(),
        U.lift(U.show),
        U.flatMapLatest(([tl, pct]) =>
          tl.progress(pct / 100))));

//

const App = ({ el = U.variable(), ind = U.variable() }) =>
  <div className="app">
    <div className="wrapper">
      <div className="box">
        <div className="smallbox"
             ref={U.refTo(el)} />
        {animate(el)}

        <div className="controls">
          <div className="tl-progress">
            Timeline progress:
            <code className="tl-progress-count">
              {progress.map(Units.pct)}
            </code>
          </div>
        </div>
        <div className="tl-progressbar">
          <div className="indicator"
               ref={U.refTo(ind)}
               style={{ left: U.lift1(Units.pct)(progress) }} />
          <hr />
        </div>
      </div>
    </div>
  </div>;

export default App;
