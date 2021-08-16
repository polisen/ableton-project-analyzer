const pako = require("pako");
const txml = require("txml");
import { nanoid } from "@reduxjs/toolkit";
import {
  AbletonProject,
  AbletonTrack,
  TrackName,
  AudioMainSequencer,
  MidiMainSequencer,
  Branch,
  DeviceGroup,
  PluginDesc,
  Devices
} from "./abletonProject.types";

export const bigTask = async (file: any) => {
  if (file) {
    let r = new FileReader();
    r.onload = function (e: any) {
      logFileData(file);
      try {
        if (file.type.includes("gzip") || file.name.includes(".als")) {
          let XMLstring = pako.inflate(new Uint8Array(e.target.result), {
            to: "string",
          });
          const parsedXML = txml.parse(XMLstring);
          console.log(parsedXML);
          let projectObj = recursiveFormat("root", parsedXML);
          console.log(projectObj)
          findData(projectObj);
          // featureExtractor(projectObj);
        } else {
          // ...
        }
        // ...
      } catch (e) {
        console.error(e);
      }
    };
    r.readAsArrayBuffer(file);
  }
};

/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */

const recursiveFormat = function recursiveProjectInfoFormatter(
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

/**
 * Extracts the data I have decided is relevant.
 * @param {AbletonProject} object - project to analyse
 * @param Patterns - shapes of data to find.
 */


const nameExtractor = (Name: TrackName) => {
  return Name.MemorizedFirstClipName ?? Name.EffectiveName;
}

const fileExtractor = ({OriginalFileSize, Path, RelativePath}: any) => {
  // console.log(OriginalFileSize, Path, RelativePath)
  return {OriginalFileSize, Path, RelativePath};
}

const samplerExtractor = ({Player: {MultiSampleMap: {SampleParts}}}: any) => {
  // console.log(SampleParts)
  let results = {}
  for(let [key, value] of Object.entries(SampleParts)) {
    let {SampleRef: {DefaultDuration, DefaultSampleRate, FileRef}}: any = value;
    results = {...results, [key]: {DefaultDuration, DefaultSampleRate, ...fileExtractor(FileRef)}}
  }
  return results
}



const groupExtractor = ({Branches}: DeviceGroup) => {
  // console.group('audioEffectBranches', Branches)
  let results:any = {};
  for(let [key, value] of Object.entries(Branches)) {
    results[nameExtractor(value.Name ?? key)] = deviceChainExtractor(value.DeviceChain)
  }
  return results
}

const pluginExtractor = ({ PluginDesc }: any): any => {
  const results: any = {};
  for (let [key, value] of Object.entries(PluginDesc)) {
    // console.log(value);
    let { PlugName, Name, Preset, Manufacturer }: any = value;
    results[PlugName ?? Name] = {
      type: Object.keys(Preset)[0].includes("Vst3")
        ? "VST3"
        : Object.keys(Preset)[0].includes("Au")
        ? "AU"
        : "VST",
      Manufacturer,
    };
  }
  return results;
};


const deviceExtractor = ({Devices}: {Devices: Devices}): object => {
  if (!Devices) return {}
  const list: any = {};
  // console.log('Devices')
  // console.log(Devices)
  for(let [key, value] of Object.entries(Devices)) {
    // console.log(key)
    if (key.includes('PluginDevice')) {
      list[nanoid()] = pluginExtractor(value)
      continue;
    }
    if (key.includes('InstrumentGroup') || key.includes('EffectGroup') || key.includes('DrumGroup')) {
      list[nanoid()] = groupExtractor(value)
      continue;
    }
    if (key.includes('MultiSampler') || key.includes('Simpler')) {
      list[nanoid()] = samplerExtractor(value)
      continue;
    }
  }
  return list
}

const audioExtractor = (MainSequencer: (AudioMainSequencer | MidiMainSequencer)): object => {
  return {}
}

const getDeviceChainName = (arr: string[]): string => arr.length === 1 ? arr[0] : arr.filter((k)=> k.includes('DeviceChain'))[0]

const deviceChainExtractor = (DeviceChain: any) => {
  let {MainSequencer} = DeviceChain;
  return {
    ...(MainSequencer ? audioExtractor(MainSequencer) : {}),
    ...deviceExtractor((DeviceChain.DeviceChain ?? DeviceChain[getDeviceChainName(Object.keys(DeviceChain))]))
  }
}

const trackExtractor = ({Name, DeviceChain}: AbletonTrack) => {
  return {
    Name: nameExtractor(Name),
    ...deviceChainExtractor(DeviceChain)
  }
}

const findData = function findInformationInProject(
  object: AbletonProject
) {

  let results: any = {};
  let tracks = {
    ...object.Ableton.LiveSet.Tracks,
    MasterTrack: object.Ableton.LiveSet.MasterTrack
  }
  // console.log(tracks)
  for(let [key,value] of Object.entries(tracks)) {
    let extractedData = trackExtractor(value)
    results[key] = extractedData;
  }
  
  
  console.log(results)
  return results
};

/**
 * Logs metadata about file.
 * @param {file} File - File<Blob>
 */
const logFileData = ({ name, type, size }: any) => {
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
