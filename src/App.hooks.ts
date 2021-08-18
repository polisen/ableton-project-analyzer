import { wrap, releaseProxy } from "comlink";
import { useEffect, useState, useMemo } from "react";


export function useAbletonAnalyzer(
    files: [File, string][],
    fileStructure: object
) {
  const [data, setData] = useState({});

  const { workerApi } = useWorker();

  useEffect(() => {
    if (files[0][0] instanceof Blob !== true) return;
    console.log('passed')
    workerApi
      .fileStructureAnalyzer(files, fileStructure)
      .then((results:object) => setData(results)); 
  }, [workerApi, setData, files]);

  return data;
}

function useWorker() {
  const workerApiAndCleanup = useMemo(() => makeWorkerApiAndCleanup(), []);

  useEffect(() => {
    const { cleanup } = workerApiAndCleanup;
    return () => {
      cleanup();
    };
  }, [workerApiAndCleanup]);

  return workerApiAndCleanup;
}


function makeWorkerApiAndCleanup() {
  const worker = new Worker("./worker", {
    name: "runBigTask",
    type: "module"
  });
  const workerApi = wrap<import("./worker").BigTaskWorker>(worker);

  const cleanup = () => {
    workerApi[releaseProxy]();
    worker.terminate();
  };

  const workerApiAndCleanup = { workerApi, cleanup };

  return workerApiAndCleanup;
}