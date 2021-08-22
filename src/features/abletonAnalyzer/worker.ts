import {expose} from 'comlink';
import {fileStructureAnalyzer} from './AbletonExtraction';


const worker = {
    fileStructureAnalyzer
}

export type BigTaskWorker = typeof worker;

expose(worker)