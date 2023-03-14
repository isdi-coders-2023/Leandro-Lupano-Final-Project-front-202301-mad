import { createAction } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user';
import { usersActions } from './users.actions.type';

export const createCreator = createAction<UserStructure>(usersActions.create);
export const logUserCreator = createAction<UserStructure>(usersActions.logUser);
