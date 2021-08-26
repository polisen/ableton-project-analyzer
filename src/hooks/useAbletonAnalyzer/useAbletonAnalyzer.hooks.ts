import { wrap, releaseProxy } from 'comlink';
import { useEffect, useState, useMemo } from 'react';

function makeWorkerApiAndCleanup() {
  const worker = new Worker('./useAbletonAnalyzer.worker', {
    name: 'runBigTask',
    type: 'module',
  });
  const workerApi = wrap<import('./useAbletonAnalyzer.worker').WorkerType>(worker);

  const cleanup = () => {
    workerApi[releaseProxy]();
    worker.terminate();
  };

  const workerApiAndCleanup = { workerApi, cleanup };

  return workerApiAndCleanup;
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

function useAbletonAnalyzer(
  files: [File, string][],
  fileStructure: object,
) {
  const [data, setData] = useState({});

  const { workerApi } = useWorker();

  useEffect(() => {
    if (files[0][0] instanceof Blob !== true) return;
    // console.log('passed')
    workerApi
      .fileStructureAnalyzer(files, fileStructure)
      .then((results: object) => {
        console.debug('workerResults', results);
        setData(results);
      });
  }, [workerApi, setData, files, fileStructure]);

  return data;
}

export default useAbletonAnalyzer;
