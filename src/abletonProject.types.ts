export interface AbletonProject {
  Ableton: {
    LiveSet: {
      Tracks: {
        [key: string]: AbletonTrack
      };
      MasterTrack: AbletonTrack;
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
  MainSequencer?: AudioMainSequencer | MidiMainSequencer;
  DeviceChain: {
      Devices: Devices;
  };
}

export type Devices = AbletonPlugin | DeviceGroup | PluginDevice;


export interface AudioMainSequencer {
  //clip view samples
  ClipSlotList: {
    ClipSlot: {
      Value: AudioClip;
    };
  };
  Sample: {
    // arranger view samples
    ArrangerAutomation: {
      Events: AudioClip;
    };
  };
}

export interface MidiMainSequencer {
  ClipTimeable: {
    ArrangerAutomation: {
      Events: {
        [key: string]: MidiClip;
      };
    };
  };
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


type AbletonPlugin = DeviceGroup | MultiSampler | OriginalSimpler


interface MultiSampler {
  Player: Player;
}

interface OriginalSimpler {
  Player: Player;
}

interface Player {
  MultiSampleMap: {
    SampleParts: {
      [key: string]: {
        SampleRef: {
          FileRef: FileRef;
        };
      };
    };
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

interface FileRef {
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
