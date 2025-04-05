import request from 'supertest';
import app from '../src/index'; // Importa la aplicación correctamente

describe('Cart Endpoints', () => {
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

  it('should add item to cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 1,
        quantity: 2
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('item_added_to_cart');
  });

  it('should get user cart items', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should remove item from cart', async () => {
    const res = await request(app)
      .delete('/api/cart/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('item_removed_from_cart');
  });

  it('should convert cart to order', async () => {
    const res = await request(app)
      .post('/api/cart/convert-to-order')
      .set('Authorization', `Bearer ${token}`)
      .send({
        shipping_address: '123 Main St'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});
