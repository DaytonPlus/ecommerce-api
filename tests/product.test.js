import request from 'supertest';
import app from '../src/index'; // Importa la aplicación correctamente

describe('Product Endpoints', () => {
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

  it('should get all products', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get product by ID', async () => {
    const res = await request(app)
      .get('/api/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Product',
        description: 'Product Description',
        price: 100.00,
        stock: 10,
        category_id: 1
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should update product', async () => {
    const res = await request(app)
      .put('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Product'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Product');
  });

  it('should delete product', async () => {
    const res = await request(app)
      .delete('/api/products/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('product_deleted_successfully');
  });

  it('should search products with filters', async () => {
    const res = await request(app)
      .get('/api/products/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        name: 'Product'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
