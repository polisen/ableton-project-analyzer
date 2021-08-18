import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

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
      state.files = action.payload;
    },
  },
});

export const { reduceFiles } = fileStructureAnalyzer.actions;


export default fileStructureAnalyzer.reducer;
