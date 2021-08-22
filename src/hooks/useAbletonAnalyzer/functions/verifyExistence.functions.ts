import { FileRef } from "../types/AbletonProjectStructure.types";

const getPathFromOrigin = (relative: string, origin: string) => {
  try {
    let rPathArr = relative.split("/").filter((x) => x);
    let oPathArr = origin.split("/").filter((x) => x);
    let newArr = [];
    let oLength = oPathArr.length - 1;
    for (let e of rPathArr) {
      if (e === "..") oLength--;
      else newArr.push(e);
    }

    if (oLength < 0) throw new Error("path out of bounds");
    let newHead = oPathArr.slice(0, oLength);
    newArr = [...newHead, ...newArr];
    return newArr;
  } catch (error) {
    // console.error(error);
    return [];
  }
};

const findInStructure = (path: string[], structure: any) => {
  // console.log(structure)
  let currentStructure = structure;
  for (let p of path) {
    // console.log(p)

    if (currentStructure[p]) currentStructure = currentStructure[p];
    else return false;
    // console.log(currentStructure)
  }
  return true;
};

export const verifyExistence = (
  samples: { [key: string]: FileRef },
  fileStructure: object,
  originPath: string
) => {
  const results: { [key: string]: string | boolean } = {};
  for (let [key, value] of Object.entries(samples)) {
    let { RelativePath } = value;
    let samplePath = getPathFromOrigin(RelativePath, originPath);
    if (!samplePath.length) results[key] = "out-of-bounds";
    else {
      results[key] = findInStructure(samplePath, fileStructure);
    }
  }

  return results;
};
