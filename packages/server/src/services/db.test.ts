import { DbService } from './db';

jest.mock('@azure/cosmos');

describe('DbService', () => {
  beforeAll(() => {
    // Set environment variables
    process.env.COSMOS_ENDPOINT = 'dummy';
    process.env.COSMOS_KEY = '123';
  });

  it('should get all tasks for a user', async () => {
    const dbService = new DbService();
    const tasks = await dbService.getTasks('123');
    expect(tasks).toEqual([]);
  });

});
