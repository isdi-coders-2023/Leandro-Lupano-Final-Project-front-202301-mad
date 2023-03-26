import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user';

export type UserState = {
  userLogged: UserStructure;
  allUsers: UserStructure[];
  user: UserStructure;
};

const initialState: UserState = {
  userLogged: {} as UserStructure,
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
      state.userLogged = action.payload;
    },

    logout(state) {
      state.userLogged = {} as UserStructure;
    },

    readId(state, action: PayloadAction<UserStructure>) {
      state.user = action.payload;
    },

    updateUser(state, action: PayloadAction<UserStructure>) {
      state.userLogged = { ...state.userLogged, ...action.payload };

      const actualInfo = [...state.allUsers];
      state.allUsers = actualInfo.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const { register, login, logout, readId, updateUser } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
