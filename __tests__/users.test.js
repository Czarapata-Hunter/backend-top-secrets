const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

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

  it('POST /api/v1/sessions will sign in a user', async () => {
    await request(app).post('/api/v1/users').send(mockMe);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'hc@testexample.com', password: '654321' });
    expect(res.status).toEqual(200);
  });

  it('DELETE /sessions deletes the users session and signs them out', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({ ...mockMe });
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'hc@testexample.com', password: '654321' });

    const resp = await agent.delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
    return user;
  });

  afterAll(() => {
    pool.end();
  });
});
