import { createReducer } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user';
import { createCreator, logUserCreator } from './users.actions.creator';

export type State = {
  userLogged: UserStructure;
  users: UserStructure[];
};

const initialState: State = {
  userLogged: {} as UserStructure,
  users: [] as UserStructure[],
};

export const usersReducer = createReducer(initialState, (builder) => {
  builder.addCase(createCreator, (state, { payload }) => {
    return { ...state, users: [...state.users, payload] };
  });

  builder.addCase(logUserCreator, (state, { payload }) => {
    return { ...state, userLogged: payload };
  });

  builder.addDefaultCase((state) => state);
});
