const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

describe('secrets', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const mockSecret = {
    title: 'Go go go!',
    description: 'Let us go over there',
  };

  const mockMe = {
    firstName: 'Hunter',
    lastName: 'Czarapata',
    email: 'hc@testexample.com',
    password: '654321',
  };

  it('GET /api/v1/secrets will return secrets to authenticated members', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...mockMe });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'hc@testexample.com', password: '654321' });
    await agent.post('/api/v1/secrets').send(mockSecret);
    const resp = await agent.get('/api/v1/secrets');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([
      {
        id: expect.any(String),
        title: 'Go go go!',
        description: 'Let us go over there',
        createdAt: expect.any(String),
      },
    ]);
  });

  it('POST /api/v1/secrets will create a new secret', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...mockMe });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'hc@testexample.com', password: '654321' });

    const resp = await agent.post('/api/v1/secrets').send(mockSecret);
    const { title, description } = mockSecret;
    expect(resp.body).toEqual({
      id: expect.any(String),
      title,
      description,
      createdAt: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
