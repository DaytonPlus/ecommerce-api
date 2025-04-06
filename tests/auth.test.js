import request from 'supertest';
import app from '../src/index';

describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not allow access to protected route without token', async () => {
    const res = await request(app)
      .get('/api/protected-route');
    expect(res.statusCode).toEqual(401);
  });

  it('should allow access to protected route with token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .get('/api/protected-route')
      .set('Authorization', `Bearer ${loginRes.body.token}`);
    expect(res.statusCode).toEqual(200);
  });
});
