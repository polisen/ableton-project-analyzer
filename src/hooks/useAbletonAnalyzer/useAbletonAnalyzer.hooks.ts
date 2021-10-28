import { wrap, releaseProxy } from 'comlink';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setAnalyzerResults } from 'slices/analyzerSlice';

function makeWorkerApiAndCleanup() {
  const worker = new Worker('./useAbletonAnalyzer.worker', {
    name: 'abletonAnalyzer',
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

function useAbletonAnalyzer(files: [File, string][]) {
  const dispatch = useAppDispatch();
  const { fileStructure } = useAppSelector((state: any) => state.fileStructure);

  const { workerApi } = useWorker();
  // console.debug(files);
  useEffect(() => {
    if (files[0] && files[0].length !== 2 && files[0][0] instanceof Blob !== true) return;

    if (Object.keys(fileStructure).length < 0) return;
    workerApi
      .fileStructureAnalyzer(files, fileStructure)
      .then((results: object) => {
        dispatch(setAnalyzerResults(results));
      }).catch((err) => {
        console.error(err);
      });
  }, [files, fileStructure]);
}

export default useAbletonAnalyzer;
