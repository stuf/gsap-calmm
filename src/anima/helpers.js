import K, * as U from 'karet.util';
import * as R from 'ramda';

// Abusing the `chain` name here, sorry.

const { flatMapLatest: chain } = U;

//

/**
 * @todo Needlessly complex, replace with tl[method](...args)
 */
export const withElemU = (el, fn, args) => tl =>
  U.seq(K(el, fn, args, tl),
        chain(([t, f, xs, gstl]) => gstl[f](t, ...xs)));

export const withElem2U = (el1, el2, fn, args) => tl =>
  U.seq(K(el1, el2, fn, args, tl),
        chain(([t1, t2, f, xs, gstl]) => gstl[f](t1, t2, ...xs)));

// @todo Likely something that can be fixed through usage of applicative style

export const constructU = name => [name, (el, ...args) => withElemU(el, name, args)];
export const construct2U = name => [name, (el1, el2, args) => withElem2U(el1, el2, name, args)]

export const constructFnsU = R.compose(R.fromPairs, R.map(constructU));
export const constructFns2U = R.compose(R.fromPairs, R.map(construct2U));

export const applyU = 0;
export const apply2U = 1;

//

export const timelineFnNames = ['to', 'from', 'fromTo', 'stagger', 'staggerTo', 'staggerFrom', 'staggerFromTo'];
export const Timeline = constructFnsU(timelineFnNames);
