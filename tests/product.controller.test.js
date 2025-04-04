const {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  searchProductsController
} = require('../src/controllers/product.controller');
const { pool } = require('../src/config/database');
const { mockRequest, mockResponse, mockNext } = require('./utils');

jest.mock('../src/config/database');

describe('Product Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getProductsController - should get all products', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    pool.query.mockResolvedValueOnce({ rows: products });

    await getProductsController(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(products);
  });

  test('getProductController - should get a product by ID', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.params.id = 1;

    const product = { id: 1, name: 'Product 1' };
    pool.query.mockResolvedValueOnce({ rows: [product] });

    await getProductController(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith(product);
  });

  // Add more tests for other functions
});