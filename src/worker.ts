import {expose} from 'comlink';
import {bigTask} from './utils';


const worker = {
    bigTask
}

export type BigTaskWorker = typeof worker;

expose(worker)