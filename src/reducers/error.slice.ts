import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ErrorState = {
  errorMessage: string;
  errorStatus: boolean;
};

const initialState: ErrorState = {
  errorMessage: '',
  errorStatus: false,
};

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,

  reducers: {
    errorActive(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.errorStatus = true;
    },

    errorDisable(state) {
      state.errorMessage = '';
      state.errorStatus = false;
    },
  },
});

export const { errorActive, errorDisable } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
