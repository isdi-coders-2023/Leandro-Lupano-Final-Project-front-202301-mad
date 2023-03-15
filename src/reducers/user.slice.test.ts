import { PayloadAction } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user';
import { State, userReducer } from './user.slice';

describe('Given the userSlice with payload and initial state mocked', () => {
  let mockInitialState: State;
  let mockPayload: UserStructure;

  beforeEach(() => {
    mockInitialState = {
      userLogged: {} as UserStructure,
      users: [],
    };

    mockPayload = {
      username: 'Test3',
      email: 'test3',
      role: 'test3',
      myGuitars: [],
      id: '1',
    };
  });

  describe('When the register action is called', () => {
    test('Then, if the initial state users is an empty array, it should return the array with the payload', () => {
      const mockRegisterAction: PayloadAction<UserStructure> = {
        type: 'user/register',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockRegisterAction);
      expect(result).toEqual({
        userLogged: {} as UserStructure,
        users: [mockPayload],
      });
    });
  });

  describe('When the login action is called', () => {
    test('Then, if the initial state userLogged is empty, it should return the payload in the userLogged property of the state', () => {
      const mockLoginAction: PayloadAction<UserStructure> = {
        type: 'user/login',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockLoginAction);
      expect(result).toEqual({
        userLogged: mockPayload as UserStructure,
        users: [],
      });
    });
  });
});
