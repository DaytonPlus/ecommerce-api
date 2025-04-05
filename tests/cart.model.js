import CartModel from './cart.model';
import { pool } from '../config/database';

jest.mock('../config/database');

describe('CartModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('checkItemInCart should return true if item is in cart', async () => {
    pool.query.mockResolvedValue({ rows: [{ product_id: 1 }] });

    const result = await CartModel.checkItemInCart(1, 1);
    expect(result).toBe(true);
  });

  test('addItemToCartDB should add or update an item in the cart', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    pool.query.mockResolvedValueOnce({});

    await CartModel.addItemToCartDB(1, 1, 2);
    expect(pool.query).toHaveBeenCalledWith('INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)', [1, 1, 2]);
  });

  test('getCartItemsDB should return all items in the user\'s cart', async () => {
    const mockItems = [{ product_id: 1, quantity: 2 }];
    pool.query.mockResolvedValue({ rows: mockItems });

    const items = await CartModel.getCartItemsDB(1);
    expect(items).toEqual(mockItems);
  });

  test('removeItemFromCartDB should remove an item from the cart', async () => {
    pool.query.mockResolvedValue({});

    await CartModel.removeItemFromCartDB(1, 1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM carts WHERE user_id = $1 AND product_id = $2', [1, 1]);
  });

  test('deleteCartDB should delete the user\'s cart', async () => {
    pool.query.mockResolvedValue({});

    await CartModel.deleteCartDB(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM carts WHERE user_id = $1', [1]);
  });

  test('calculateCartPriceTotal should return the total price of the cart', async () => {
    const mockItems = [{ price: '10.50', quantity: 2 }, { price: '5.75', quantity: 1 }];
    pool.query.mockResolvedValue({ rows: mockItems });

    const total = await CartModel.calculateCartPriceTotal(1);
    expect(total).toBe('26.75');
  });
});
