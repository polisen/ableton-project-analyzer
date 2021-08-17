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
  Devices,
} from "./AbletonExtraction.types";

import {
  nameExtractor,
  stripDuplicatePlugins,
  stripDuplicateSamples,
  getDeviceChainName,
  giveNewKeys,
  fileExtractor,
  logFileData,
} from "./utility";



export async function bigTask(file: any) {
  if (file instanceof Blob !== true) return {};
  if (file) {
    console.log(file)
    let results = {};
      logFileData(file);
      try {
        if (file.type.includes("gzip") || file.name.includes(".als")) {
          let XMLstring = pako.inflate(new Uint8Array(await file.arrayBuffer()), {
            to: "string",
          });
          const parsedXML = txml.parse(XMLstring);
          let projectObj = recursiveFormat("root", parsedXML);
          let projectData = findData(projectObj);
          results = projectData;
        } else {
          // ...
        }
        // ...
      } catch (e) {
        console.error(e);
      }

    console.log({results})
    return results;
  }
  return {};
}


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

const samplerExtractor = ({
  Player: {
    MultiSampleMap: { SampleParts },
  },
}: any) => {
  // console.log(SampleParts)
  let results = {};
  for (let [key, value] of Object.entries(SampleParts)) {
    let {
      SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
    }: any = value;
    results = {
      ...results,
      [key]: { DefaultDuration, DefaultSampleRate, ...fileExtractor(FileRef) },
    };
  }
  return results;
};

const groupExtractor = ({ Branches }: DeviceGroup) => {
  // console.group('audioEffectBranches', Branches)
  let results: any = {};
  for (let [key, value] of Object.entries(Branches)) {
    results[nameExtractor(value.Name ?? key)] = deviceChainExtractor(
      value.DeviceChain
    );
  }
  return results;
};

const pluginExtractor = ({ PluginDesc }: any): any => {
  const results: any = {};
  for (let [key, value] of Object.entries(PluginDesc)) {
    // console.log(value);
    let { PlugName, Name, Preset, Manufacturer }: any = value;
    results[nanoid()] = {
      Name: PlugName ?? Name,
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

const clipSlotExtractor = ({ ClipSlot }: any): any => {
  let samples: any = {};
  if (!ClipSlot.Value) return {};
  for (let [key, value] of Object.entries(ClipSlot.Value)) {
    const {
      SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
    }: any = value;
    samples[nanoid()] = {
      DefaultDuration,
      DefaultSampleRate,
      ...fileExtractor(FileRef),
    };
  }
  return samples;
};

const sampleExtractor = (sample: any) => {
  console.log(sample);
  const {
    SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
  }: any = sample;
  return {
    [nanoid()]: {
      DefaultDuration,
      DefaultSampleRate,
      ...fileExtractor(FileRef),
    },
  };
};

const audioExtractor = (MainSequencer: AudioMainSequencer): object => {
  if (!MainSequencer.Sample) return {};
  if (!MainSequencer.Sample.ArrangerAutomation.Events) return {};
  const list: any = {};

  for (let [key, value] of Object.entries(MainSequencer.ClipSlotList)) {
    list["samples"] = { ...list["samples"], ...clipSlotExtractor(value) };
  }

  for (let [key, value] of Object.entries(
    MainSequencer.Sample.ArrangerAutomation.Events
  )) {
    list["samples"] = { ...list["samples"], ...sampleExtractor(value) };
  }

  return list;
};

const deviceChainExtractor = (DeviceChain: any) => {
  let { MainSequencer } = DeviceChain;
  return {
    ...(MainSequencer ? audioExtractor(MainSequencer) : {}),
    ...deviceExtractor(
      DeviceChain.DeviceChain ??
        DeviceChain[getDeviceChainName(Object.keys(DeviceChain))]
    ),
  };
};

const deviceExtractor = ({ Devices }: { Devices: Devices }): object => {
  if (!Devices) return {};
  const list: any = {};

  for (let [key, value] of Object.entries(Devices)) {
    if (key.includes("PluginDevice")) {
      let info = pluginExtractor(value);
      list["plugins"] = { ...list["plugins"], ...info };
      continue;
    }
    if (
      key.includes("InstrumentGroup") ||
      key.includes("EffectGroup") ||
      key.includes("DrumGroup")
    ) {
      let info = groupExtractor(value);
      for (let [key, value] of Object.entries(info)) {
        let { samples, plugins }: any = value;
        list["samples"] = { ...list["samples"], ...samples };
        list["plugins"] = { ...list["plugins"], ...plugins };
      }
      continue;
    }
    if (key.includes("MultiSampler") || key.includes("Simpler")) {
      let info = samplerExtractor(value);
      list["samples"] = { ...list["samples"], ...giveNewKeys(info) };
      continue;
    }
  }
  return list;
};

const findData = function findInformationInProject(object: AbletonProject) {
  let results: any = {
    bpm: parseInt(object.Ableton.LiveSet.TimeSelection.AnchorTime),
  };
  let tracks = {
    ...object.Ableton.LiveSet.Tracks,
    MasterTrack: object.Ableton.LiveSet.MasterTrack,
  };
  // console.log(tracks)
  for (let [key, value] of Object.entries(tracks)) {
    let extractedData = {
      Name: nameExtractor(value.Name),
      ...deviceChainExtractor(value.DeviceChain),
    };
    let { samples, plugins }: any = extractedData;
    results["samples"] = { ...results["samples"], ...samples };
    results["plugins"] = { ...results["plugins"], ...plugins };
  }
  results.samples = stripDuplicateSamples(results.samples);
  results.plugins = stripDuplicatePlugins(results.plugins);

  return results;
};
