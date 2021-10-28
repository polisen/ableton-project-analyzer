/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { nanoid } from '@reduxjs/toolkit';
import { TrackName } from '../../../types/abletonProjectStructure';

export const stripDuplicateSamples = (obj: any) => {
  const arr: any = [];
  const object: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    const { Path }: any = value;
    if (!arr.includes(Path)) object[key] = value;
    arr.push(Path);
  });
  return object;
};

export const stripDuplicatePlugins = (obj: any) => {
  const pathObj: any = { AU: {}, VST3: {}, VST: {} };
  const object: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    const { Name, type }: any = value;
    pathObj[type] = pathObj[type] || {};
    if (pathObj[type][Name]) return;
    object[key] = value;
    pathObj[type][Name] = true;
  });
  return object;
};

const buildStructure = (paths: string[]) => {
  const obj: any = {};

  paths.forEach((p: string) => p
    .split('/')
    .filter((f) => f)
    .reduce((r, e) => {
      if (r[e]) return r[e];
      return (r[e] = {});
    }, obj));

  return obj;
};

export const getZippedFileStructure = (zipped: any) => {
  const { files } = zipped;
  const paths = Object.keys(files).filter((f) => !f.includes('__MACOSX'));

  return buildStructure(paths);
};

export const getFileStructure = (arr: File[]) => {
  if (arr.length <= 0) return {};
  const paths = arr.map((file: any) => file.path);

  return buildStructure(paths);
};

/**
 * Logs metadata about file.
 * @param {file} File - File<Blob>
 */
// export const logFileData = ({ name, type, size }: any) => {
//   // Console.log(
//   //   `${'User layout file:\n' + 'name: '}${name}\n`
//   //     + `type: ${type}\n`
//   //     + `size: ${size} bytes\n`,
//   // );
// };

export const nameExtractor = (Name: TrackName) => Name.MemorizedFirstClipName ?? Name.EffectiveName;

export const fileExtractor = ({
  OriginalFileSize,
  Path,
  RelativePath,
}: any) => {
  console.debug(OriginalFileSize, Path, RelativePath);
  return {
    OriginalFileSize,
    Path,
    RelativePath,
    FileName: Path.split('/').slice(-1)[0],
  };
};

// type DeviceChainNameResult =
//   | 'AudioToAudioDeviceChain'
//   | 'MidiToAudioDeviceChain'
//   | 'MainSequencer'
//   | 'Devices'
//   | 'MidiToMidiDeviceChain';

export const getDeviceChainName = (arr: string[]): any => {
  if (arr.length !== 1) throw new Error('Too many devices in chain.');
  return arr[0];
};

export const giveNewKeys = (obj: any) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    newObj[nanoid()] = obj[key];
  });
  return newObj;
};

/**
 * Recursively traverses object structure, recursing for each layer,
 * returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of running txml.parse() over stringified xml.
 */

export const recursiveFormat = function recursiveProjectInfoFormatter(
  tag: string,
  arr: any,
) {
  // if (arr instanceof Array !== true) console.log(arr);
  // console.log(tagName)
  if (arr.length === 0) return {};
  let obj: any = {};
  arr.forEach((child: any) => {
    const { children, tagName, attributes } = child;
    if (!children || !tagName || !attributes) {
      obj = child;
      return;
    }
    if (children.length === 0 && attributes.Value) {
      if (Object.keys(attributes).length > 0) {
        obj.attributes = attributes;
      }
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
  });

  return obj;
};
