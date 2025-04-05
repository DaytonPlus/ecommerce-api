import OrderModel from './order.model';
import { pool } from '../config/database';

jest.mock('../config/database');

describe('OrderModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createOrder should create a new order', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 100, status: 'pending', shipping_address: '123 Street', shipping_status: 'pending' };
    pool.query.mockResolvedValue({ rows: [mockOrder] });

    const newOrder = await OrderModel.createOrder(mockOrder);
    expect(newOrder).toEqual(mockOrder);
  });

  test('insertOrderDetail should insert an order detail', async () => {
    pool.query.mockResolvedValue({});

    await OrderModel.insertOrderDetail(1, 1, 2);
    expect(pool.query).toHaveBeenCalledWith('INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)', [1, 1, 2]);
  });

  test('getAllOrders should return all orders', async () => {
    const mockOrders = [{ id: 1, user_id: 1, total: 100 }];
    pool.query.mockResolvedValue({ rows: mockOrders });

    const orders = await OrderModel.getAllOrders();
    expect(orders).toEqual(mockOrders);
  });

  test('getOrderById should return an order by ID', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 100 };
    pool.query.mockResolvedValue({ rows: [mockOrder] });

    const order = await OrderModel.getOrderById(1);
    expect(order).toEqual(mockOrder);
  });

  test('getOrdersByUser should return orders by user ID', async () => {
    const mockOrders = [{ id: 1, user_id: 1, total: 100 }];
    pool.query.mockResolvedValue({ rows: mockOrders });

    const orders = await OrderModel.getOrdersByUser(1);
    expect(orders).toEqual(mockOrders);
  });

  test('updateOrderById should update an order by ID', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 150, status: 'shipped', shipping_address: '123 Street', shipping_status: 'shipped' };
    pool.query.mockResolvedValue({ rows: [mockOrder] });

    const updatedOrder = await OrderModel.updateOrderById(1, mockOrder);
    expect(updatedOrder).toEqual(mockOrder);
  });

  test('deleteOrderById should delete an order by ID', async () => {
    pool.query.mockResolvedValue({});

    await OrderModel.deleteOrderById(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM orders WHERE id = $1', [1]);
  });

  test('cancelOrderById should cancel an order by ID', async () => {
    pool.query.mockResolvedValue({});

    await OrderModel.cancelOrderById(1);
    expect(pool.query).toHaveBeenCalledWith('UPDATE orders SET status = $1 WHERE id = $2', ['cancelled', 1]);
  });
});
