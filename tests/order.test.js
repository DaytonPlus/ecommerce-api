import request from 'supertest';
import app from '../src/index'; // Importa la aplicación correctamente

describe('Order Endpoints', () => {
  let token;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    token = loginRes.body.token;
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        total: 100.00,
        shipping_address: '123 Main St',
        status: 'pending',
        shipping_status: 'pending'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get order by ID', async () => {
    const res = await request(app)
      .get('/api/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update order', async () => {
    const res = await request(app)
      .put('/api/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'shipped'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'shipped');
  });

  it('should delete order', async () => {
    const res = await request(app)
      .delete('/api/orders/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('order_deleted_successfully');
  });

  it('should request order cancellation', async () => {
    const res = await request(app)
      .post('/api/orders/1/cancel')
      .set('Authorization', `Bearer ${token}`)
      .send({
        reason: 'Changed my mind'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('cancel_request_registered');
  });
});
