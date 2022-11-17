const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('secrets', () => {
  beforeEach(() => {
    return setup(pool);
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
