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
  console.debug(files);
  useEffect(() => {
    if (files[0] && files[0].length !== 2 && files[0][0] instanceof Blob !== true) return;
    // console.log('passed')
    workerApi
      .fileStructureAnalyzer(files, fileStructure)
      .then((results: object) => {
        setData(results);
      });
  }, [workerApi, setData, files, fileStructure]);

  return data;
}

export default useAbletonAnalyzer;
