import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user';

export type State = {
  userToken: UserStructure;
  allUsers: UserStructure[];
  user: UserStructure;
};

const initialState: State = {
  userToken: {} as UserStructure,
  allUsers: [],
  user: {} as UserStructure,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    register(state, action: PayloadAction<UserStructure>) {
      state.allUsers = [...state.allUsers, action.payload];
    },

    login(state, action: PayloadAction<UserStructure>) {
      state.userToken = action.payload;
    },

    readId(state, action: PayloadAction<UserStructure>) {
      state.user = action.payload;
    },

    update(state, action: PayloadAction<UserStructure>) {
      const actualInfo = [...state.allUsers];
      state.allUsers = actualInfo.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const { register, login } = userSlice.actions;
export const userReducer = userSlice.reducer;
