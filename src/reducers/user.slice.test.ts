import { PayloadAction } from '@reduxjs/toolkit';
import { UserStructure } from '../models/user';
import { UserState, userReducer } from './user.slice';

describe('Given the userSlice with payload and initial state mocked', () => {
  let mockInitialState: UserState;
  let mockPayload: UserStructure;
  let mockUser: UserStructure;

  beforeEach(() => {
    mockInitialState = {
      userLogged: {} as UserStructure,
      allUsers: [],
      user: {} as UserStructure,
    };

    mockPayload = {
      username: 'Test3',
      email: 'test3',
      role: 'test3',
      myGuitars: [],
      id: '3',
    };

    mockUser = {
      username: 'Test1',
      email: 'test1',
      role: 'test1',
      myGuitars: [],
      id: '1',
    };
  });

  describe('When the register action is called', () => {
    test('Then, if the initial state allUsers is an empty array, it should return the payload in the allUsers property of the state', () => {
      const mockRegisterAction: PayloadAction<UserStructure> = {
        type: 'user/register',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockRegisterAction);
      expect(result).toEqual({
        userLogged: {} as UserStructure,
        allUsers: [mockPayload],
        user: {},
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
        userLogged: mockPayload,
        allUsers: [],
        user: {},
      });
    });
  });

  describe('When the logout action is called', () => {
    test('Then, if the initial state userLogged is completed, it should return undefined in the userLogged token property of the state', () => {
      const mockInitialStateLogout = {
        userLogged: {
          token: 'testToken',
        } as UserStructure,
        allUsers: [],
        user: {} as UserStructure,
      };

      const mockLogoutAction = {
        type: 'user/logout',
      };
      const result = userReducer(mockInitialStateLogout, mockLogoutAction);
      expect(result).toEqual({
        userLogged: {
          token: undefined,
        },
        allUsers: [],
        user: {},
      });
    });
  });

  describe('When the readId action is called', () => {
    test('Then, if the initial state user is empty, it should return the payload in the user property of the state', () => {
      const mockReadIdAction: PayloadAction<UserStructure> = {
        type: 'user/readId',
        payload: mockPayload,
      };
      const result = userReducer(mockInitialState, mockReadIdAction);
      expect(result).toEqual({
        userLogged: {},
        allUsers: [],
        user: mockPayload,
      });
    });
  });

  describe('When the updateUser action is called', () => {
    test('Then, if the initial state allUsers is an Array with mockUser and mockPayload, it should return the updateUser with mockUpdateAction', () => {
      mockInitialState = {
        userLogged: {} as UserStructure,
        allUsers: [mockUser, mockPayload],
        user: {} as UserStructure,
      };

      const mockUpdateAction: PayloadAction<UserStructure> = {
        type: 'user/updateUser',
        payload: {
          username: 'Test3-UPDATE',
          email: 'test3',
          role: 'test3',
          myGuitars: [],
          id: '3',
        },
      };
      const result = userReducer(mockInitialState, mockUpdateAction);
      expect(result).toEqual({
        userLogged: {
          username: 'Test3-UPDATE',
          email: 'test3',
          role: 'test3',
          myGuitars: [],
          id: '3',
        },
        allUsers: [
          mockUser,
          {
            username: 'Test3-UPDATE',
            email: 'test3',
            role: 'test3',
            myGuitars: [],
            id: '3',
          },
        ],
        user: {},
      });
    });
  });
});
