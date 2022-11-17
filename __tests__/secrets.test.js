const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('secrets', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const mockSecret = {
    title: 'Go go go!',
    description: 'Let us go over there',
  };

  it('POST /api/v1/secrets will create a new secret', async () => {
    const res = await request(app).post('/api/v1/secrets').send(mockSecret);
    expect(res.status).toBe(200);
    const { title, description } = mockSecret;

    expect(res.body).toEqual({
      id: expect.any(String),
      title,
      description,
      createdAt: expect.any(String),
    });
  });

  it('GET /api/v1/secrets will return secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');
    expect(res.status).toBe(200);
    const secret = res.body.find((secret) => secret.id === '1');
    expect(secret).toEqual({
      id: '1',
      title: 'Invasion Plans',
      description: 'Gonna invade yo',
      createdAt: expect.any(String),
    });
  });
});
