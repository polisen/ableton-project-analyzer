export interface AbletonProject {
  Ableton: {
    LiveSet: {
      Tracks: {
        [key: string]: AbletonTrack
      };
      MasterTrack: AbletonTrack;
      TimeSelection: {
        AnchorTime: string;
      }
    };
  };
}

export interface AbletonTrack {
  Name: TrackName;
  DeviceChain: DeviceChain;
}

interface MidiClip {
  //tbd
}

export interface ReturnTrack {
  Name: TrackName;
  DeviceChain: DeviceChain;
}

export interface TrackName {
  EffectiveName: string;
  MemorizedFirstClipName: string;
}

export interface DeviceChain {
  MainSequencer?: MainSequencer;
  DeviceChain?: {
      Devices: Devices;
  };
  Devices?: Devices
}

export type Devices = {
  [key: string]: Device;
}

export type Device = AbletonPlugin | DeviceGroup | PluginDevice;
type AbletonPlugin = DeviceGroup | Sampler


export interface MainSequencer {
  //clip view samples
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

export interface MidiMainSequencer {

}

export interface DeviceGroup {
  Branches: {
    [key: string]: Branch;
  };
}


export interface Branch {
  Name: TrackName;
  DeviceChain: DeviceChain;
}




export interface Sampler {
  Player: Player;
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
    DefaultDuration: number;
    DefaultSampleRate: number;
    FileRef: FileRef;
  };
}

interface PluginDevice {
  [key: string]: {
    PluginDesc: PluginDesc;
  }
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