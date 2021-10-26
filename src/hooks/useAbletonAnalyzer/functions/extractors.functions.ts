import { nanoid } from '@reduxjs/toolkit';
import {
  DeviceGroup,
  DevicesType,
  Sample,
  DeviceChainType,
  Sampler,
  MainSequencer,
} from 'types/abletonProjectStructure';

import {
  SampleResult,
} from 'types/analyzer';
import {
  nameExtractor,
  getDeviceChainName,
  giveNewKeys,
  fileExtractor,
} from './utility.functions';

/**
 * All of these functions are recursively extracting some part of the ableton project.
 * They call each in different constellations depending on the project structure.
 * deviceExtractor could be said to be the main junction
 * deviceChainExractor is the entry point.
 * TODO: Document better. Sorry. No time right now.
 * TODO: Stronger types.  Recursive typing is hard.
 */

const getType = (string: string) => {
  // console.log({ string });
  if (string.includes('Vst3')) return 'VST3';
  if (string.includes('Au')) return 'AU';
  return 'VST';
};

const pluginExtractor = ({ PluginDesc }: any): any => {
  const results: any = {};

  Object.entries(PluginDesc).forEach(([, value]) => {
    const {
      PlugName, Name, Preset, Manufacturer,
    }: any = value;
    // console.debug(Preset);
    results[nanoid()] = {
      Name: PlugName ?? Name,
      type: getType(Object.keys(Preset)[0]),
      Manufacturer,
    };
  });

  return results;
};

const clipSlotExtractor = ({ ClipSlot }: any): any => {
  const samples: any = {};
  if (!ClipSlot.Value) return {};
  Object.entries(ClipSlot.Value).forEach(([, value]) => {
    const {
      SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
    }: any = value;
    samples[nanoid()] = {
      DefaultDuration,
      DefaultSampleRate,
      ...fileExtractor(FileRef),
    };
  });
  return samples;
};

const sampleExtractor = (sample: Sample) => {
  const {
    SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
  } = sample;
  return {
    [nanoid()]: {
      DefaultDuration,
      DefaultSampleRate,
      ...fileExtractor(FileRef),
    },
  };
};

interface AudioExtractorResult {
  samples: {
    [key:string]: SampleResult;
  }
}

const audioExtractor = (MainSeq: MainSequencer): object => {
  if (!MainSeq.Sample) return {};
  if (!MainSeq.Sample.ArrangerAutomation.Events) return {};
  const list: AudioExtractorResult = {
    samples: {},

  };

  Object.entries(MainSeq.ClipSlotList).forEach(([, value]) => {
    list.samples = { ...list.samples, ...clipSlotExtractor(value) };
  });

  Object.entries(MainSeq.Sample.ArrangerAutomation.Events).forEach(
    ([, value]) => {
      list.samples = { ...list.samples, ...sampleExtractor(value) };
    },
  );

  return list;
};

interface SamplerExtractorResult {
  [key: string]: SampleResult;
}

const samplerExtractor = ({
  Player: {
    MultiSampleMap: { SampleParts },
  },
}: Sampler) => {
  let results:SamplerExtractorResult = {};
  Object.entries(SampleParts).forEach(([key, value]) => {
    const {
      SampleRef: { DefaultDuration, DefaultSampleRate, FileRef },
    }: Sample = value;
    console.debug('samplerExtractor -->', { value });
    results = {
      ...results,
      [key]: { DefaultDuration, DefaultSampleRate, ...fileExtractor(FileRef) },
    };
  });
  return results;
};

const groupExtractor = ({ Branches }: DeviceGroup) => {
  // console.group('audioEffectBranches', Branches)
  const results: any = {};
  Object.entries(Branches).forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    results[nameExtractor(value.Name ?? key)] = deviceChainExtractor(
      value.DeviceChain,
    );
  });
  return results;
};

const deviceExtractor = ({ Devices }: { Devices: DevicesType }): object => {
  if (!Devices) return {};
  const list: any = {};

  Object.entries(Devices).forEach(([key, value]: [string, any]) => {
    if (key.includes('PluginDevice')) {
      const info = pluginExtractor(value);
      list.plugins = { ...list.plugins, ...info };
      return;
    }
    if (
      key.includes('InstrumentGroup')
      || key.includes('EffectGroup')
      || key.includes('DrumGroup')
    ) {
      const info = groupExtractor(value);
      Object.entries(info).forEach(([, val]) => {
        const { samples, plugins }: any = val;
        list.samples = { ...list.samples, ...samples };
        list.plugins = { ...list.plugins, ...plugins };
      });

      return;
    }
    if (key.includes('MultiSampler') || key.includes('Simpler')) {
      const info = samplerExtractor(value);
      list.samples = { ...list.samples, ...giveNewKeys(info) };
    }
  });

  return list;
};

function deviceChainExtractor(DeviceChain: DeviceChainType | any) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { MainSequencer } = DeviceChain;
  return {
    ...(MainSequencer ? audioExtractor(MainSequencer) : {}),
    ...deviceExtractor(
      DeviceChain.DeviceChain
        ?? DeviceChain[getDeviceChainName(Object.keys(DeviceChain))],
    ),
  };
}

export default deviceChainExtractor;
