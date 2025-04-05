import request from 'supertest';
import express from 'express';
import OrderController from './order.controller';
import OrderModel from '../models/order.model';
import CancellationRequestModel from '../models/cancellation_request.model';

jest.mock('../models/order.model');
jest.mock('../models/cancellation_request.model');

const app = express();
app.use(express.json());
app.use('/orders', OrderController);

describe('OrderController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /orders should create a new order', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 100, status: 'pending', shipping_address: '123 Street', shipping_status: 'pending' };
    OrderModel.createOrder.mockResolvedValue(mockOrder);

    const response = await request(app).post('/orders').send(mockOrder);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockOrder);
  });

  test('GET /orders should return all orders', async () => {
    const mockOrders = [{ id: 1, user_id: 1, total: 100 }];
    OrderModel.getAllOrders.mockResolvedValue(mockOrders);

    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });

  test('GET /orders/:id should return an order by ID', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 100 };
    OrderModel.getOrderById.mockResolvedValue(mockOrder);

    const response = await request(app).get('/orders/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });

  test('GET /orders/user should return orders by user ID', async () => {
    const mockOrders = [{ id: 1, user_id: 1, total: 100 }];
    OrderModel.getOrdersByUser.mockResolvedValue(mockOrders);

    const response = await request(app).get('/orders/user');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });

  test('PUT /orders/:id should update an order by ID', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 150, status: 'shipped', shipping_address: '123 Street', shipping_status: 'shipped' };
    OrderModel.updateOrderById.mockResolvedValue(mockOrder);

    const response = await request(app).put('/orders/1').send(mockOrder);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrder);
  });

  test('DELETE /orders/:id should delete an order by ID', async () => {
    OrderModel.deleteOrderById.mockResolvedValue();

    const response = await request(app).delete('/orders/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'order_deleted_successfully' });
  });

  test('POST /orders/:id/cancel should request or cancel an order', async () => {
    const mockOrder = { id: 1, user_id: 1, total: 100, status: 'pending', shipping_address: '123 Street', shipping_status: 'pending' };
    OrderModel.getOrderById.mockResolvedValue(mockOrder);
    CancellationRequestModel.createCancellationRequest.mockResolvedValue();

    const response = await request(app).post('/orders/1/cancel').send({ reason: 'Changed my mind' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'cancel_request_registered' });
  });
});
