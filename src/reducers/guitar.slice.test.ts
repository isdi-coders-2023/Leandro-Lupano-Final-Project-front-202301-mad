import { PayloadAction } from '@reduxjs/toolkit';
import { GuitarStructure } from '../models/guitar';
import { guitarReducer, GuitarState } from './guitar.slice';

describe('Given the guitarSlice with payload and initial state mocked', () => {
  let mockInitialState: GuitarState;
  let mockPayload: GuitarStructure;
  let mockGuitar: GuitarStructure;

  beforeEach(() => {
    mockInitialState = {
      allGuitars: [],
      guitar: {} as GuitarStructure,
      actualPage: 1,
      actualStyle: 'All',
    };

    mockPayload = {
      id: '3',
      brand: 'test3',
      modelGuitar: 'test3',
      picture: 'test3',
      style: 'test3',
      material: 'test3',
      price: 3,
      description: 'test3',
    };

    mockGuitar = {
      id: '1',
      brand: 'test1',
      modelGuitar: 'test1',
      picture: 'test1',
      style: 'test1',
      material: 'test1',
      price: 1,
      description: 'test1',
    };
  });

  describe('When the read action is called', () => {
    test('Then, if the initial state allGuitars is empty, it should return the payload in the allGuitars property of the state', () => {
      const mockReadAction: PayloadAction<GuitarStructure[]> = {
        type: 'guitar/read',
        payload: [mockPayload],
      };
      const result = guitarReducer(mockInitialState, mockReadAction);
      expect(result).toEqual({
        allGuitars: [mockPayload],
        guitar: {},
        actualPage: 1,
        actualStyle: 'All',
      });
    });
  });

  describe('When the readId action is called', () => {
    test('Then, if the initial state guitar is empty, it should return the payload in the guitar property of the state', () => {
      const mockReadIdAction: PayloadAction<GuitarStructure> = {
        type: 'guitar/readId',
        payload: mockPayload,
      };
      const result = guitarReducer(mockInitialState, mockReadIdAction);
      expect(result).toEqual({
        allGuitars: [],
        guitar: mockPayload,
        actualPage: 1,
        actualStyle: 'All',
      });
    });
  });

  describe('When the create action is called', () => {
    test('Then, if the initial state allGuitars is empty, it should return the payload in the allGuitars property of the state', () => {
      const mockCreateAction: PayloadAction<GuitarStructure> = {
        type: 'guitar/create',
        payload: mockPayload,
      };
      const result = guitarReducer(mockInitialState, mockCreateAction);
      expect(result).toEqual({
        allGuitars: [mockPayload],
        guitar: {},
        actualPage: 1,
        actualStyle: 'All',
      });
    });
  });

  describe('When the updateGuitarSlice action is called', () => {
    test('Then, if the initial state allGuitars is an Array of mockPayload and mockGuitar, it should return the allGuitar state with the mockUpdateAction', () => {
      mockInitialState = {
        allGuitars: [mockPayload, mockGuitar],
        guitar: {} as GuitarStructure,
        actualPage: 1,
        actualStyle: 'All',
      };

      const mockUpdateAction: PayloadAction<GuitarStructure> = {
        type: 'guitar/updateGuitarSlice',
        payload: {
          id: '3',
          brand: 'test3-UPDATE',
          modelGuitar: 'test3',
          picture: 'test3',
          style: 'test3',
          material: 'test3',
          price: 3,
          description: 'test3',
        },
      };
      const result = guitarReducer(mockInitialState, mockUpdateAction);
      expect(result).toEqual({
        allGuitars: [
          {
            id: '3',
            brand: 'test3-UPDATE',
            modelGuitar: 'test3',
            picture: 'test3',
            style: 'test3',
            material: 'test3',
            price: 3,
            description: 'test3',
          },
          mockGuitar,
        ],
        guitar: {},
        actualPage: 1,
        actualStyle: 'All',
      });
    });
  });

  describe('When the deleteGuitar action is called', () => {
    test('Then, if the initial state allGuitars is an Array of mockPayload and mockGuitar, it should return the payload in the allGuitars property of the state', () => {
      mockInitialState = {
        allGuitars: [mockPayload, mockGuitar],
        guitar: {} as GuitarStructure,
        actualPage: 1,
        actualStyle: 'All',
      };

      const mockDeleteAction: PayloadAction<GuitarStructure['id']> = {
        type: 'guitar/deleteGuitar',
        payload: '3',
      };
      const result = guitarReducer(mockInitialState, mockDeleteAction);
      expect(result).toEqual({
        allGuitars: [mockGuitar],
        guitar: {},
        actualPage: 1,
        actualStyle: 'All',
      });
    });
  });

  describe('When the pageUpdate action is called', () => {
    test('Then, if the initial state actualPage is 1, it should return the payload in the actualPage property of the state', () => {
      mockInitialState = {
        allGuitars: [],
        guitar: {} as GuitarStructure,
        actualPage: 1,
        actualStyle: 'All',
      };

      const mockPageUpdateAction: PayloadAction<number> = {
        type: 'guitar/pageUpdate',
        payload: 3,
      };
      const result = guitarReducer(mockInitialState, mockPageUpdateAction);
      expect(result).toEqual({
        allGuitars: [],
        guitar: {},
        actualPage: 3,
        actualStyle: 'All',
      });
    });
  });

  describe('When the styleUpdate action is called', () => {
    test('Then, if the initial state actualStyle is All, it should return the payload in the actualStyle property of the state', () => {
      mockInitialState = {
        allGuitars: [],
        guitar: {} as GuitarStructure,
        actualPage: 1,
        actualStyle: 'All',
      };

      const mockStyleUpdateAction: PayloadAction<string> = {
        type: 'guitar/styleUpdate',
        payload: 'Electric',
      };
      const result = guitarReducer(mockInitialState, mockStyleUpdateAction);
      expect(result).toEqual({
        allGuitars: [],
        guitar: {},
        actualPage: 1,
        actualStyle: 'Electric',
      });
    });
  });
});
