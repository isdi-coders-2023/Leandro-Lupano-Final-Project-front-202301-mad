import { GuitarStructure } from '../../models/guitar';
import { GuitarsApiRepo } from './guitars.api.repo';

describe('Given GuitarsApiRepo class and its instance', () => {
  let repo: GuitarsApiRepo;

  beforeEach(() => {
    repo = new GuitarsApiRepo();
  });

  const mockGuitar = {
    brand: 'test',
    modelGuitar: 'test',
    picture: 'test',
    style: 'Electric',
    material: 'test',
    price: 1,
    description: 'test',
  } as unknown as GuitarStructure;

  describe('When the read method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([
          {
            brand: 'test1',
          },
          {
            brand: 'test2',
          },
        ]),
      });

      const result = await repo.read('tokenMock', 1, 'All');
      expect(result).toEqual([
        {
          brand: 'test1',
        },
        {
          brand: 'test2',
        },
      ]);
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.read('tokenMock', 0, 'All');
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the readId method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ brand: 'test' }),
      });

      const result = await repo.readId('tokenMock', 'idGuitarMock');
      expect(result).toEqual({ brand: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.readId('tokenMock', 'idGuitarMock');
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the create method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ brand: 'test' }),
      });

      const result = await repo.create('tokenMock', mockGuitar);
      expect(result).toEqual({ brand: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.create('tokenMock', mockGuitar);
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the update method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ brand: 'test' }),
      });

      const result = await repo.update('tokenMock', 'idGuitarMock', mockGuitar);
      expect(result).toEqual({ brand: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.update('tokenMock', 'idGuitarMock', mockGuitar);
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the delete method is called', () => {
    test('Then if the fetch response is Ok, the response should be undefined for void Promise', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          name: 'test',
        }),
      });

      const result = await repo.delete('tokenMock', 'idGuitarMock');
      expect(result).toBe(undefined);
    });

    test('Then if the fetch response is not Ok, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.delete('tokenMock', 'idGuitarMock');
      await expect(result).rejects.toThrow();
    });
  });
});
