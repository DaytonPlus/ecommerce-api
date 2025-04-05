import request from 'supertest';
import express from 'express';
import BalanceController from './balance.controller';
import BalanceModel from '../models/balance.model';

jest.mock('../models/balance.model');

const app = express();
app.use(express.json());
app.use('/balances', BalanceController);

describe('BalanceController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /balances/me should return the balance of the authenticated user', async () => {
    const mockBalance = { balance: 100.00 };
    BalanceModel.getBalanceByUserId.mockResolvedValue(mockBalance);

    const response = await request(app).get('/balances/me');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ balance: mockBalance });
  });

  test('GET /balances/:userId should return the balance of the specified user', async () => {
    const mockBalance = { user_id: 1, balance: 100.00 };
    BalanceModel.getBalanceByUserId.mockResolvedValue(mockBalance);

    const response = await request(app).get('/balances/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBalance);
  });

  test('PUT /balances/:userId should update the balance of the specified user', async () => {
    const mockBalance = { user_id: 1, balance: 150.00 };
    BalanceModel.updateBalance.mockResolvedValue(mockBalance);

    const response = await request(app).put('/balances/1').send({ amount: 150.00 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBalance);
  });

  test('POST /balances should create an initial balance for a user', async () => {
    const mockBalance = { user_id: 1, balance: 0.00 };
    BalanceModel.createInitialBalance.mockResolvedValue(mockBalance);

    const response = await request(app).post('/balances').send({ userId: 1, initialBalance: 0.00 });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockBalance);
  });

  test('DELETE /balances/:userId should delete the balance record for a user', async () => {
    BalanceModel.deleteBalanceByUserId.mockResolvedValue();

    const response = await request(app).delete('/balances/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'balance_record_deleted_successfully' });
  });
});
