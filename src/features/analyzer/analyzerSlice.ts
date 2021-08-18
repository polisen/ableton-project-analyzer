import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {nanoid} from '@reduxjs/toolkit'
export interface FileStructureState {
  files: {
    [key:string]: object
  }
}

const initialState: any = {
  files: {},
};



export const fileStructureAnalyzer = createSlice({
  name: 'fileStructure',
  initialState,
  reducers: {
    reduceFiles: (state, action: PayloadAction<object>) => {
      let obj: any = {};
      Object.entries(action.payload).map(([key,value]: any) => {
        let samples: any = {}
        let projectVerified = true;

        Object.entries(value.samples).map(([sKey,sValue]: any) => {
          let sampleVerified = () => {
            let bool = (value.verifiedSamples[sKey] && value.verifiedSamples[sKey] !== 'out-of-bounds' )
            if (!bool) projectVerified = false;
            return bool
          }
          samples[sKey] = {...sValue, verified: sampleVerified()}
        })

        obj[key] = {...value, samples, verified: projectVerified}
      })
      state.files = obj;
    },
    setAcceptedFiles: (state, action: PayloadAction<Array<File>>) => {
      console.log(action.payload)
      state.files = action.payload.reduce((obj: any, file: File): any => {
        // console.log(obj, file)
        obj[nanoid()] = {fileName: file.name};
        return obj;
      }, {})
    }
  },
});

export const { reduceFiles, setAcceptedFiles } = fileStructureAnalyzer.actions;


export default fileStructureAnalyzer.reducer;
