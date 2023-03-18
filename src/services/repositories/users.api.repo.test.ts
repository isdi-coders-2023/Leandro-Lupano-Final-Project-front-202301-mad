import { UsersApiRepo } from './users.api.repo';

describe('Given UsersApiRepo class and its instance', () => {
  let repo: UsersApiRepo;

  beforeEach(() => {
    repo = new UsersApiRepo();
  });

  describe('When the create method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          username: 'test',
        }),
      });

      const result = await repo.create({ username: 'test' }, 'actionTest');
      expect(result).toEqual({ username: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.create({ username: 'test' }, 'actionTest');
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the readId method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          username: 'test',
        }),
      });

      const result = await repo.readId('idTest', 'tokenTest');
      expect(result).toEqual({ username: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.readId('idTest', 'tokenTest');
      await expect(result).rejects.toThrow();
    });
  });

  describe('When the update method is called', () => {
    test('Then if the fetch response is Ok, the result should be equal to the mock value', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          username: 'test',
        }),
      });

      const result = await repo.update('idTest', 'tokenTest', 'actionTest');
      expect(result).toEqual({ username: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.update('idTest', 'tokenTest', 'actionTest');
      await expect(result).rejects.toThrow();
    });
  });
});
