import { nanoid } from "@reduxjs/toolkit";
import {
  DeviceGroup,
  Device,
  Sample,
  Sampler,
  MainSequencer,
} from "../types/AbletonProjectStructure.types";

import {
  nameExtractor,
  getDeviceChainName,
  giveNewKeys,
  fileExtractor,
} from "./utility.functions";

/**
 * All of these functions are recursively extracting some part of the ableton project.
 * They call each in different constellations depending on the project structure.
 * deviceExtractor could be said to be the main junction
 * deviceChainExractor is the entry point.
 * TODO: Document better. Sorry. No time right now.
 * TODO: Stronger types.  Recursive typing is hard.
 */

export const deviceChainExtractor = (DeviceChain: any) => {
  let { MainSequencer } = DeviceChain;
  return {
    ...(MainSequencer ? audioExtractor(MainSequencer) : {}),
    ...deviceExtractor(
      DeviceChain.DeviceChain ??
        DeviceChain[getDeviceChainName(Object.keys(DeviceChain))]
    ),
  };
};

const deviceExtractor = ({ Devices }: { Devices: Device }): object => {
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

const samplerExtractor = ({
  Player: {
    MultiSampleMap: { SampleParts },
  },
}: Sampler) => {
  // console.log(SampleParts)
  let results = {};
  for (let [key, value] of Object.entries(SampleParts)) {
    let {
      SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
    }: Sample = value;
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

const audioExtractor = (MainSequencer: MainSequencer): object => {
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
