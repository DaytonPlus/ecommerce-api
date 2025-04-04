// products.test.ts - Tests de productos
import request from 'supertest';
import app from '../index';
import { pool } from '../config/database';

describe('Product API', () => {
  let authToken: string;

  beforeAll(async () => {
    // Crear usuario y obtener token
    await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Product Tester',
        email: 'product@test.com',
        password: 'test123'
      });
    
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'product@test.com',
        password: 'test123'
      });
    
    authToken = loginRes.body.token;
  });

  test('Obtener lista de productos', async () => {
    const response = await request(app)
      .get('/api/products');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Crear producto sin autenticación debe fallar', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        nombre: 'Test Product',
        precio: 99.99,
        stock: 10
      });
    
    expect(response.statusCode).toBe(401);
  });

  test('Crear producto con autenticación', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        nombre: 'New Product',
        descripcion: 'Test Description',
        precio: 149.99,
        stock: 5,
        categoria_id: 1
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
