import request from 'supertest';
import assert from 'assert';
import startServer from '../src/server.js';

describe('Routes', () => {
  let server;
  let yourAuthToken;
  let adminAuthToken;

  before(async () => {
    server = await startServer(true);
  });
  
  after(async () => {
    if (server && server.close) {
      await new Promise(resolve => server.close(resolve));
    }
  });

  describe('Auth Routes', () => {
    it('should register a new user', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ name: 'testuser', email: 'testuser@user.test', password: 'testpass' });
      
      assert.strictEqual(res.status, 201);
      
      // assert.deepStrictEqual(res.body, { message: 'User registered successfully' });
    });
    /*
    
    it('should login a user', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ email: 'testuser@user.test', password: 'testpass' });

      assert.strictEqual(res.status, 200);
      assert.ok(res.body.token);

      yourAuthToken = res.body.token;
    });
    
    it('should return 401 for invalid credentials', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ email: 'testuser@user.test', password: 'wrongpass' });

      assert.strictEqual(res.status, 401);
      // assert.deepStrictEqual(res.body, { message: 'Invalid credentials' });
    });

    it('should login an admin user', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ email: 'admin@user.test', password: 'admin' });

      assert.strictEqual(res.status, 200);
      assert.ok(res.body.token);

      adminAuthToken = res.body.token;
    });
    */
  });
});
