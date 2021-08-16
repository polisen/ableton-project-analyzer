import {expose} from 'comlink';
import {bigTask} from './AbletonExtraction';


const worker = {
    bigTask
}

export type BigTaskWorker = typeof worker;

expose(worker)