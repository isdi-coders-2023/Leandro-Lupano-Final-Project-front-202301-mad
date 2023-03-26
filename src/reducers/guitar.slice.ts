import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GuitarStructure } from '../models/guitar';

export type GuitarState = {
  allGuitars: GuitarStructure[];
  guitar: GuitarStructure;
  actualPage: number;
  actualStyle: string;
};

const initialState: GuitarState = {
  allGuitars: [],
  guitar: {} as GuitarStructure,
  actualPage: 1,
  actualStyle: 'All',
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

    updateGuitarSlice(state, action: PayloadAction<GuitarStructure>) {
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

    pageUpdate(state, action: PayloadAction<number>) {
      state.actualPage = action.payload;
    },

    styleUpdate(state, action: PayloadAction<string>) {
      state.actualStyle = action.payload;
    },
  },
});

export const {
  read,
  readId,
  create,
  updateGuitarSlice,
  deleteGuitar,
  pageUpdate,
  styleUpdate,
} = guitarSlice.actions;
export const guitarReducer = guitarSlice.reducer;
