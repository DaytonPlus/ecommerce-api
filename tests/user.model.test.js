import UserModel from './user.model';
import { pool } from '../config/database';
import bcrypt from 'bcryptjs';

jest.mock('../config/database');
jest.mock('bcryptjs');

describe('UserModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createUser should create a new user with hashed password', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', is_admin: false };
    const hashedPassword = 'hashedPassword123';
    bcrypt.hash.mockResolvedValue(hashedPassword);
    pool.query.mockResolvedValue({ rows: [{ ...mockUser, password: hashedPassword }] });

    const newUser = await UserModel.createUser(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
    expect(newUser).toEqual({ ...mockUser, password: hashedPassword });
  });

  test('findUserByEmail should return a user by email', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123', is_admin: false };
    pool.query.mockResolvedValue({ rows: [mockUser] });

    const user = await UserModel.findUserByEmail(mockUser.email);
    expect(user).toEqual(mockUser);
  });

  test('getAllUsers should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    pool.query.mockResolvedValue({ rows: mockUsers });

    const users = await UserModel.getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  test('getUserById should return a user by ID', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    pool.query.mockResolvedValue({ rows: [mockUser] });

    const user = await UserModel.getUserById(1);
    expect(user).toEqual(mockUser);
  });

  test('updateUser should update a user by ID', async () => {
    const mockUser = { id: 1, name: 'Updated User', email: 'updated@example.com', password: 'newpassword', is_admin: false };
    const hashedPassword = 'hashedNewPassword';
    bcrypt.hash.mockResolvedValue(hashedPassword);
    pool.query.mockResolvedValue({});

    await UserModel.updateUser(1, mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
    expect(pool.query).toHaveBeenCalledWith(
      'UPDATE users SET name = $1, email = $2, password = $3, is_admin = $4 WHERE id = $5',
      [mockUser.name, mockUser.email, hashedPassword, mockUser.is_admin, 1]
    );
  });

  test('deleteUser should delete a user by ID', async () => {
    pool.query.mockResolvedValue({});

    await UserModel.deleteUser(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM users WHERE id = $1', [1]);
  });
});
