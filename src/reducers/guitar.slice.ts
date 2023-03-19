import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GuitarStructure } from '../models/guitar';

export type GuitarState = {
  allGuitars: GuitarStructure[];
  guitar: GuitarStructure;
};

const initialState: GuitarState = {
  allGuitars: [],
  guitar: {} as GuitarStructure,
};

const guitarSlice = createSlice({
  name: 'guitar',
  initialState,

  reducers: {
    read(state, action: PayloadAction<GuitarStructure[]>) {
      state.allGuitars = action.payload;
    },

    readId(state, action: PayloadAction<GuitarStructure>) {
      state.guitar = action.payload;
    },

    create(state, action: PayloadAction<GuitarStructure>) {
      state.allGuitars = [...state.allGuitars, action.payload];
    },

    update(state, action: PayloadAction<GuitarStructure>) {
      const actualInfo = [...state.allGuitars];

      state.allGuitars = actualInfo.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },

    deleteGuitar(state, action: PayloadAction<GuitarStructure['id']>) {
      const actualInfo = [...state.allGuitars];

      state.allGuitars = actualInfo.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { read, readId, create, update, deleteGuitar } =
  guitarSlice.actions;
export const guitarReducer = guitarSlice.reducer;
