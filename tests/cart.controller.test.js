import request from 'supertest';
import express from 'express';
import CartController from './cart.controller';
import CartModel from '../models/cart.model';
import OrderModel from '../models/order.model';
import BalanceModel from '../models/balance.model';

jest.mock('../models/cart.model');
jest.mock('../models/order.model');
jest.mock('../models/balance.model');

const app = express();
app.use(express.json());
app.use('/cart', CartController);

describe('CartController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /cart should add an item to the user\'s cart', async () => {
    CartModel.addItemToCartDB.mockResolvedValue();

    const response = await request(app).post('/cart').send({ productId: 1, quantity: 2 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'item_added_to_cart' });
  });

  test('GET /cart should return all items in the user\'s cart', async () => {
    const mockItems = [{ product_id: 1, quantity: 2 }];
    CartModel.getCartItemsDB.mockResolvedValue(mockItems);

    const response = await request(app).get('/cart');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockItems);
  });

  test('DELETE /cart/item/:productId should remove an item from the user\'s cart', async () => {
    CartModel.removeItemFromCartDB.mockResolvedValue();

    const response = await request(app).delete('/cart/item/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'item_removed_from_cart' });
  });

  test('DELETE /cart should delete the user\'s cart', async () => {
    CartModel.deleteCartDB.mockResolvedValue();

    const response = await request(app).delete('/cart');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'cart_deleted_successfully' });
  });

  test('POST /cart/convert-to-order should convert the cart to an order', async () => {
    const mockItems = [{ product_id: 1, quantity: 2 }];
    CartModel.getCartItemsDB.mockResolvedValue(mockItems);
    CartModel.calculateCartPriceTotal.mockResolvedValue(50.00);
    BalanceModel.getBalanceByUserId.mockResolvedValue(100.00);
    OrderModel.createOrderInDB.mockResolvedValue({ id: 1, total: 50.00 });
    OrderModel.insertOrderDetail.mockResolvedValue();
    CartModel.deleteCartDB.mockResolvedValue();

    const response = await request(app).post('/cart/convert-to-order').send({ shipping_address: '123 Street' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, total: 50.00 });
  });
});
