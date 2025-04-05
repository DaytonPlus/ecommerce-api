import BalanceModel from './balance.model';
import { pool } from '../config/database';

jest.mock('../config/database');

describe('BalanceModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getBalanceByUserId should return the balance for a user by ID', async () => {
    const mockBalance = { user_id: 1, balance: 100.00 };
    pool.query.mockResolvedValue({ rows: [mockBalance] });

    const balance = await BalanceModel.getBalanceByUserId(1);
    expect(balance).toEqual(mockBalance);
  });

  test('updateBalance should update the balance for a user by ID', async () => {
    const mockBalance = { user_id: 1, balance: 150.00 };
    pool.query.mockResolvedValue({ rows: [mockBalance] });

    const updatedBalance = await BalanceModel.updateBalance(1, 150.00);
    expect(updatedBalance).toEqual(mockBalance);
  });

  test('createInitialBalance should create an initial balance for a user', async () => {
    const mockBalance = { user_id: 1, balance: 0.00 };
    pool.query.mockResolvedValue({ rows: [mockBalance] });

    const newBalance = await BalanceModel.createInitialBalance(1);
    expect(newBalance).toEqual(mockBalance);
  });

  test('deleteBalanceByUserId should delete the balance record for a user by ID', async () => {
    pool.query.mockResolvedValue({});

    await BalanceModel.deleteBalanceByUserId(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM balances WHERE user_id = $1', [1]);
  });
});
