import * as L from 'partial.lenses';
import { lift1Shallow } from 'karet.util';

import Units from './units';

export const LiftedUnits = L.transform([L.values, L.modifyOp(lift1Shallow)], Units);
