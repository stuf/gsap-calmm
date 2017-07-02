/// <reference path="units.d.ts" />
import * as R from 'ramda';

const units = ['pct', '%',
               'px', 'px',
               'rem', 'rem',
               'vh', 'vh',
               'vw', 'vw'];

const unitFn = R.curry((u, v) => [v, u].join(''));

const constructUnitFns =
  R.compose(R.fromPairs,
            R.map(([n, u]) => [n, unitFn(u)]),
            R.splitEvery(2));

const unitFns = constructUnitFns(units);

Object.assign(window, { unitFns });

export default unitFns;
