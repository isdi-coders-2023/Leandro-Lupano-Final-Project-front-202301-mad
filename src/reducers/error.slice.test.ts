import { PayloadAction } from '@reduxjs/toolkit';
import { errorReducer, ErrorState } from './error.slice';

describe('Given the errorSlice with payload and initial state mocked', () => {
  describe('When the errorActive action is called', () => {
    test('Then, if the initial state errorMessage is empty, it should return the payload in the errorMessage property of the state and true in errorStatus', () => {
      const mockInitialState = {
        errorMessage: '',
        errorStatus: false,
      } as unknown as ErrorState;

      const mockPayload: string = 'Error test';

      const mockErrorAction: PayloadAction<string> = {
        type: 'errorSlice/errorActive',
        payload: mockPayload,
      };
      const result = errorReducer(mockInitialState, mockErrorAction);
      expect(result).toEqual({
        errorMessage: 'Error test',
        errorStatus: true,
      });
    });
  });

  describe('When the errorDisable action is called', () => {
    test('Then, if the initial state errorMessage is Error test and true errorStatus, it should return an empty string in the errorMessage property of the state and false in errorStatus', () => {
      const mockInitialState = {
        errorMessage: 'Error test',
        errorStatus: true,
      } as unknown as ErrorState;

      const mockErrorActionDisable = {
        type: 'errorSlice/errorDisable',
      };

      const result = errorReducer(mockInitialState, mockErrorActionDisable);
      expect(result).toEqual({
        errorMessage: '',
        errorStatus: false,
      });
    });
  });
});
