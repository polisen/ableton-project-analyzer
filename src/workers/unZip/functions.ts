import JSZip from 'jszip';

export const unZipFile = async (url: string) => {
  const blob = await fetch(url).then((r) => r.blob());
  const newZip = new JSZip();

  return newZip.loadAsync(blob).then(async (zipped: any) => {
    const info: { name: string; path: string }[] = [];
    const promises = Object.entries(zipped.files).map(async ([, v]: any) => {
      if (v.dir || v.name.includes('__MACOSX')) return null;
      info.push({
        name: v.name.split('/').slice(-1)[0],
        path: v.name,
      });
      return v.async('blob');
    });

    const blobs = await Promise.all(promises);

    return blobs
      .filter((b: Blob) => b !== null)
      .map((b: Blob, i) => [new File([b], info[i].name), info[i].path])
      .filter((f: any) => !f[1].includes('__MACOSX'))
      .map(([f, p]) => [f, p]);
  });
};

export const bajs = 1;
