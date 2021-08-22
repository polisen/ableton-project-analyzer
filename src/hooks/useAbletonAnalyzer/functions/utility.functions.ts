import {
  TrackName,
} from "../types/AbletonProjectStructure.types";
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
  // console.log(arr)
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



/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */

export const recursiveFormat = function recursiveProjectInfoFormatter(
  tagName: string,
  arr: any
) {
  if (arr instanceof Array !== true) console.log(arr);
  // console.log(tagName)
  if (arr.length === 0) return;
  let obj: any = {};
  for (let child of arr) {
    let { children, tagName, attributes } = child;
    if (!children || !tagName || !attributes) {
      return child;
    }
    if (children.length === 0 && attributes.Value)
      if (Object.keys(attributes).length > 0) {
        obj.attributes = attributes;
      }
    if (children.length > 0) {
      obj = {
        ...obj,
        [attributes.Id ? `${tagName}_${attributes.Id}` : tagName]: {
          ...recursiveFormat(tagName, children),
        },
      };
    } else if (attributes.Value) {
      obj = { ...obj, [tagName]: attributes.Value };
    }
  }
  return obj;
};
