import CancellationRequestModel from './cancellation_request.model';
import { pool } from '../config/database';

jest.mock('../config/database');

describe('CancellationRequestModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createCancellationRequest should create a new cancellation request', async () => {
    const mockRequest = { id: 1, order_id: 1, user_id: 1, reason: 'Changed my mind' };
    pool.query.mockResolvedValue({ rows: [mockRequest] });

    const newRequest = await CancellationRequestModel.createCancellationRequest(1, 1, 'Changed my mind');
    expect(newRequest).toEqual(mockRequest);
  });

  test('getAllCancellationRequests should return all cancellation requests', async () => {
    const mockRequests = [{ id: 1, order_id: 1, user_id: 1, reason: 'Changed my mind' }];
    pool.query.mockResolvedValue({ rows: mockRequests });

    const requests = await CancellationRequestModel.getAllCancellationRequests();
    expect(requests).toEqual(mockRequests);
  });

  test('getCancellationRequestById should return a cancellation request by ID', async () => {
    const mockRequest = { id: 1, order_id: 1, user_id: 1, reason: 'Changed my mind' };
    pool.query.mockResolvedValue({ rows: [mockRequest] });

    const request = await CancellationRequestModel.getCancellationRequestById(1);
    expect(request).toEqual(mockRequest);
  });

  test('getAllCancellationRequestsByUserId should return all cancellation requests by user ID', async () => {
    const mockRequests = [{ id: 1, order_id: 1, user_id: 1, reason: 'Changed my mind' }];
    pool.query.mockResolvedValue({ rows: mockRequests });

    const requests = await CancellationRequestModel.getAllCancellationRequestsByUserId(1);
    expect(requests).toEqual(mockRequests);
  });

  test('updateCancellationRequestStatus should update the status of a cancellation request', async () => {
    const mockRequest = { id: 1, order_id: 1, user_id: 1, reason: 'Changed my mind', status: 'approved' };
    pool.query.mockResolvedValue({ rows: [mockRequest] });

    const updatedRequest = await CancellationRequestModel.updateCancellationRequestStatus(1, 'approved');
    expect(updatedRequest).toEqual(mockRequest);
  });
});
