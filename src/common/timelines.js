import * as U from 'karet.util';
import { makeObservableTimeline } from '../anima';

export const masterBus = U.bus();
export const masterBusProp = U.template(masterBus);

// export const master = makeTimeline({ onUpdate });
export const master = makeObservableTimeline();

export const progressBar = makeObservableTimeline({ paused: true });
