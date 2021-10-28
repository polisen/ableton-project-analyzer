import { expose } from 'comlink';
import { unZipFile } from './functions';

const worker = {
  unZipFile,
};

export type WorkerType = typeof worker;

expose(worker);
