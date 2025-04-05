import request from 'supertest';
import express from 'express';
import UserController from './user.controller';
import UserModel from '../models/user.model';
import BalanceModel from '../models/balance.model';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model');
jest.mock('../models/balance.model');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/users', UserController);

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /users should create a new user', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', is_admin: false };
    UserModel.createUser.mockResolvedValue(mockUser);
    BalanceModel.createInitialBalance.mockResolvedValue();

    const response = await request(app).post('/users').send(mockUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  test('GET /users should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }];
    UserModel.getAllUsers.mockResolvedValue(mockUsers);

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  test('GET /users/:id should return a user by ID', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    UserModel.getUserById.mockResolvedValue(mockUser);

    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  test('PUT /users/:id should update a user by ID', async () => {
    const mockUser = { id: 1, name: 'Updated User', email: 'updated@example.com', password: 'newpassword', is_admin: false };
    UserModel.updateUser.mockResolvedValue();

    const response = await request(app).put('/users/1').send(mockUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'user_updated_successfully' });
  });

  test('DELETE /users/:id should delete a user by ID', async () => {
    UserModel.deleteUser.mockResolvedValue();

    const response = await request(app).delete('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'user_deleted_successfully' });
  });

  test('GET /users/me should return the current user', async () => {
    const mockUser = { userId: 1, name: 'Current User', email: 'current@example.com', is_admin: true };
    jwt.verify.mockReturnValue(mockUser);

    const response = await request(app).get('/users/me').set('Authorization', 'Bearer token');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: mockUser.userId,
      name: mockUser.name,
      email: mockUser.email,
      is_admin: mockUser.is_admin,
    });
  });
});
