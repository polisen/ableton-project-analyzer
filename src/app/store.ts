import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fileStructureReducer from '../features/abletonAnalyzer/analyzerSlice';

export const store = configureStore({
  reducer: {
    fileStructure: fileStructureReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
