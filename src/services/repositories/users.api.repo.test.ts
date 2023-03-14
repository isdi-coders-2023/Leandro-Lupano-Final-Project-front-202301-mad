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

      const result = await repo.create({ username: 'test' }, 'test');
      expect(result).toEqual({ username: 'test' });
    });

    test('Then if the fetch response is NOK, the result should throw an error', async () => {
      global.fetch = jest.fn().mockResolvedValue('Error Test');

      const result = repo.create({ username: 'test' }, 'test');
      await expect(result).rejects.toThrow();
    });
  });
});
