import request from 'supertest';
import express from 'express';
import unknownEndpoint from '../../middleware/unknownEndpoint';

describe('unknownEndpoint middleware', () => {
  let app: any;

  beforeAll(() => {
    app = express();
    app.use(unknownEndpoint);
  });

  it('should return 404 with error message for unknown endpoints', async () => {
    const response = await request(app).get('/non-existent-route');

    expect(response.status).toBe(404);

    expect(response.body).toEqual({ error: 'unknown endpoint' });
  });
});
