const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

describe('users', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const mockMe = {
    firstName: 'Hunter',
    lastName: 'Czarapata',
    email: 'hc@testexample.com',
    password: '654321',
  };

  it('POST /api/v1/users will create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockMe);
    expect(res.status).toBe(200);
    const { firstName, lastName, email } = mockMe;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
