import { expose } from "comlink";
import { fileStructureAnalyzer } from "./useAbletonAnalyzer.functions";

const worker = {
  fileStructureAnalyzer,
};

export type WorkerType = typeof worker;

expose(worker);
