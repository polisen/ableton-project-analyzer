import {expose} from 'comlink';
import {AbletonProjectAnalyzer} from './mainTask';


const worker = {
    AbletonProjectAnalyzer
}

export type AbletonProjectAnalyzerType = typeof worker;

expose(worker)