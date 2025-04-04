// auth.test.ts - Tests de autenticación
import request from 'supertest';
import app from '../index';
import { pool } from '../config/database';

describe('Auth API', () => {
  const testUser = {
    nombre: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  beforeAll(async () => {
    // Limpiar datos de prueba
    await pool.query('TRUNCATE TABLE test_users RESTART IDENTITY CASCADE');
  });

  test('Registro de usuario exitoso', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('Registro con email duplicado debe fallar', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    expect(response.statusCode).toBe(400);
  });

  test('Login exitoso', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('Login con credenciales inválidas debe fallar', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });
    
    expect(response.statusCode).toBe(401);
  });
});
