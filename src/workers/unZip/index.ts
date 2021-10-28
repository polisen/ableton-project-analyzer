import { wrap, releaseProxy } from 'comlink';

async function unZip(url: string) {
  const worker = new Worker('./unZip.worker', {
    name: 'unZip',
    type: 'module',
  });
  const api = wrap<import('./unZip.worker').WorkerType>(worker);
  let results: [File, string][] = [];
  await api
    .unZipFile(url)
    .then((r: any) => {
      results = r;
    })
    .catch((err: Error) => {
      console.error(err);
    });

  api[releaseProxy]();
  worker.terminate();
  return results;
}

export default unZip;
