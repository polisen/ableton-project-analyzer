export interface AbletonProject {
  Ableton: {
    LiveSet: {
      Tracks: {
        [key: string]: AbletonTrack;
      };
      MasterTrack: AbletonTrack;
      TimeSelection: {
        AnchorTime: string;
      };
    };
  };
}

export interface AbletonTrack {
  Name: TrackName;
  DeviceChain: DeviceChainType;
}

interface MidiClip {
  // tbd
}

export interface ReturnTrack {
  Name: TrackName;
  DeviceChain: DeviceChainType;
}

export interface TrackName {
  EffectiveName: string;
  MemorizedFirstClipName: string;
}

export interface DeviceChainType {
  MainSequencer?: MainSequencer;

  AudioToAudioDeviceChain?: {
    Devices?: DevicesType;
  };
  MidiToAudioDeviceChain?: {
    Devices?: DevicesType;
  };
  MidiToMidiDeviceChain?: {
    Devices?: DevicesType;
  };
  DeviceChain?: {
    Devices?: DevicesType;
  };
  Devices?: DevicesType;
}

export type DevicesType = {
  [key: string]: Device;
};

// export type Device = Sampler | DeviceGroup | PluginDevice;

export interface Device {
  PluginDesc?: PluginDesc;
  Branches?: {
    [key: string]: Branch;
  };
  Player?: Player
}

export interface DeviceGroup {
  Branches: {
    [key: string]: Branch;
  };
}

export interface Sampler {
  Player: Player;
}

export interface MainSequencer {
  // clip view samples
  ClipSlotList: {
    ClipSlot: {
      Value: AudioClip;
    };
  };
  Sample?: {
    // arranger view samples
    ArrangerAutomation: {
      Events: AudioClip;
    };
  };
  ClipTimeable?: {
    ArrangerAutomation: {
      Events: {
        [key: string]: MidiClip;
      };
    };
  };
}

export interface Branch {
  Name: TrackName;
  DeviceChain: DeviceChainType;
}

interface Player {
  MultiSampleMap: {
    SampleParts: {
      [key: string]: Sample;
    };
  };
}

export interface Sample {
  SampleRef: {
    DefaultDuration: string;
    DefaultSampleRate: string;
    FileRef: FileRef;
  };
}

export interface PluginDesc {
  Manufacturer?: string;
  Name?: string;
  PlugName?: string;
  Preset: AuPreset | VST3Preset | VSTPreset;
}

interface VSTPreset {
  Buffer: Buffer;
}

interface VST3Preset {
  ProcessorState: Buffer;
}

interface AuPreset {
  Buffer: Buffer;
  PresetRef: {
    FilePresetRef: FileRef;
  };
}

interface Buffer {
  [key: string]: string;
}

export interface FileRef {
  OriginalFileSize: string;
  Path: string;
  RelativePath: string;
}

interface AudioClip {
  Name: string;
  SampleRef: {
    // Duration in minutes base10 = DefaultDuration / DefaultSampleRate / 60
    DefaultDuration: string;
    DefaultSampleRate: string;
    FileRef: FileRef;
  };
}
