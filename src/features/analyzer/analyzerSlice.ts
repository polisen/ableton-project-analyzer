import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface FileStructureState {
  value: number;
}

const initialState: any = {
  value: 0,
  status: 'idle',
};



export const fileStructureAnalyzer = createSlice({
  name: 'fileStructure',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = fileStructureAnalyzer.actions;


export default fileStructureAnalyzer.reducer;
