import { wrap, releaseProxy } from "comlink";
import { useEffect, useState, useMemo } from "react";


export function useAbletonAnalyzer(
    file: File
) {
  const [data, setData] = useState({});

  const { workerApi } = useWorker();

  useEffect(() => {
      console.log(file instanceof Blob)
    if (file instanceof Blob !== true) return;
    console.log('passed')
    workerApi
      .bigTask(file)
      .then((results:object) => setData(results)); 
  }, [workerApi, setData, file]);

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