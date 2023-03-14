import { UserStructure } from '../models/user';
import { createCreator, logUserCreator } from './users.actions.creator';
import { State, usersReducer } from './users.reducer';

describe('Given the userReducer with payload and initial state mocked', () => {
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

  describe('When the action is empty', () => {
    test('Then, it should return the initial state', () => {
      // const initialState = mockState;
      const action = { type: '' };
      const result = usersReducer(mockInitialState, action);
      expect(result).toEqual(mockInitialState);
    });
  });

  describe('When the action is create', () => {
    test('Then, if the initial state users is an empty array, it should return the array with the payload', () => {
      const result = usersReducer(mockInitialState, createCreator(mockPayload));

      expect(result).toEqual({
        userLogged: {} as UserStructure,
        users: [mockPayload],
      });
    });
  });

  describe('When the action is logUser', () => {
    test('Then, if the initial state userLogged is empty, it should return the payload in the userLogged property of the state', () => {
      const result = usersReducer(
        mockInitialState,
        logUserCreator(mockPayload)
      );

      expect(result).toEqual({
        userLogged: mockPayload as UserStructure,
        users: [],
      });
    });
  });
});
