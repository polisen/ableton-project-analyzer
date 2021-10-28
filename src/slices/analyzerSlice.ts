/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

const initialState: any = {
  files: {},
  fileStructure: {},
};

export const fileStructureAnalyzer = createSlice({
  name: 'fileStructure',
  initialState,
  reducers: {
    reduceFiles: (state, action: PayloadAction<object>) => {
      const obj: any = {};
      console.debug({ payload: action.payload });
      Object.entries(action.payload).map(([key, value]: any) => {
        const samples: any = {};
        let projectVerified = true;

        Object.entries(value.samples).map(([sKey, sValue]: any) => {
          const sampleVerified = () => {
            const bool = value.verifiedSamples[sKey]
              && value.verifiedSamples[sKey] !== 'out-of-bounds';
            if (!bool) projectVerified = false;
            return bool;
          };
          samples[sKey] = { ...sValue, verified: sampleVerified() };
        });

        obj[key] = { ...value, samples, verified: projectVerified };
      });
      state.files = obj;
    },
    setAcceptedFiles: (state, action: PayloadAction<Array<File>>) => {
      state.files = action.payload.reduce((obj: any, file: File): any => {
        obj[nanoid()] = { fileName: file.name };
        return obj;
      }, {});
    },
    setFileStructure: (state, action: PayloadAction<Object>) => {
      console.debug('action.payload', action.payload);
      state.fileStructure = action.payload;
    },
    setFiles: (state, action: PayloadAction<Object>) => {
      state.files = action.payload;
    },
  },
});

export const {
  reduceFiles, setAcceptedFiles, setFileStructure, setFiles,
} = fileStructureAnalyzer.actions;

export default fileStructureAnalyzer.reducer;
