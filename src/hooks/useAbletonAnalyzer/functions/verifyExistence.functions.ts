import { FileRef } from '../../../types/abletonProjectStructure';

const getPathFromOrigin = (relative: string, origin: string) => {
  try {
    const rPathArr = relative.split('/').filter((x) => x);
    const oPathArr = origin.split('/').filter((x) => x);
    let newArr: string[] = [];
    let oLength = oPathArr.length - 1;
    rPathArr.forEach((e) => {
      if (e === '..') oLength += 1;
      else newArr.push(e);
    });

    if (oLength < 0) throw new Error('path out of bounds');
    const newHead = oPathArr.slice(0, oLength);
    newArr = [...newHead, ...newArr];
    return newArr;
  } catch (error) {
    return [];
  }
};

const findInStructure = (path: string[], structure: any) => {
  let bool = true;
  let currentStructure = structure;
  path.forEach((p) => {
    if (currentStructure[p]) {
      currentStructure = currentStructure[p];
    } else {
      bool = false;
    }
  });
  return bool;
};

const verifyExistence = (
  samples: { [key: string]: FileRef },
  fileStructure: object,
  originPath: string,
) => {
  const results: { [key: string]: string | boolean } = {};
  Object.entries(samples).forEach(([key, value]) => {
    const { RelativePath } = value;
    const samplePath = getPathFromOrigin(RelativePath, originPath);
    if (!samplePath.length) results[key] = 'out-of-bounds';
    else {
      results[key] = findInStructure(samplePath, fileStructure);
    }
  });
  return results;
};

export default verifyExistence;
