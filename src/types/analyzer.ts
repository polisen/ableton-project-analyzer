export interface Files {
  [key: string]: ProjectFileResult;
}

export interface ProjectFileResult {
  fileName: string;
  path: string;
  samples: { [key: string]: SampleResult };
  plugins: { [key: string]: PluginResult };
  verifiedSamples: { [key: string]: boolean };
  verified: boolean;
}

export interface SampleResult {
  DefaultDuration: string;
  DefaultSampleRate: string;
  OriginalFileSize: string;
  Path: string;
  RelativePath: string;
  FileName: string;
  verified?: boolean;
}

export interface PluginResult {
  Name: string;
  type: 'AU' | 'VST' | 'VST3';
  Manufacturer?: string;
}
