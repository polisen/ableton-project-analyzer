import {
  TrackName,
} from "./AbletonExtraction.types";
import { nanoid } from "@reduxjs/toolkit";

export const stripDuplicateSamples = (obj: any) => {
  let arr: any = [];
  let object: any = {};
  for (let [key, value] of Object.entries(obj)) {
    let { Path }: any = value;
    if (!arr.includes(Path)) object[key] = value;
    arr.push(Path);
  }
  return object;
};

export const stripDuplicatePlugins = (obj: any) => {
  let pathObj: any = { AU: {}, VST3: {}, VST: {} };
  let object: any = {};
  for (let [key, value] of Object.entries(obj)) {
    let { Name, type }: any = value;
    if (pathObj[type][Name]) continue;
    object[key] = value;
    pathObj[type][Name] = true;
  }
  return object;
};

export const buildDirectoryStructure = (arr: File[]) => {
  let obj: any = {};
  if (arr.length <= 0) return {};
  console.log(arr)
  arr.forEach(function(file: any) {
      let {path}: {path: string} = file;
      path.split('/').filter(f => f).reduce(function(r:any, e:any) {
        return r[e] || (r[e] = {})
      }, obj)
    })
  return obj;
};


/**
 * Logs metadata about file.
 * @param {file} File - File<Blob>
 */
export const logFileData = ({ name, type, size }: any) => {
  console.log(
    "User layout file:\n" +
      "name: " +
      name +
      "\n" +
      "type: " +
      type +
      "\n" +
      "size: " +
      size +
      " bytes\n"
  );
};

export const nameExtractor = (Name: TrackName) => {
  return Name.MemorizedFirstClipName ?? Name.EffectiveName;
};

export const fileExtractor = ({
  OriginalFileSize,
  Path,
  RelativePath,
}: any) => {
  // console.log(OriginalFileSize, Path, RelativePath)
  return { OriginalFileSize, Path, RelativePath, FileName: Path.split('/').slice(-1)[0]  };
};

export const getDeviceChainName = (arr: string[]): string =>
  arr.length === 1 ? arr[0] : arr.filter((k) => k.includes("DeviceChain"))[0];

export const giveNewKeys = (obj: any) => {
  let newObj: any = {};
  Object.keys(obj).forEach((key) => (newObj[nanoid()] = obj[key]));
  return newObj;
};
