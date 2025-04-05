import request from 'supertest';
import express from 'express';
import ProductController from './product.controller';
import ProductModel from '../models/product.model';

jest.mock('../models/product.model');

const app = express();
app.use(express.json());
app.use('/products', ProductController);

describe('ProductController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /products should return all products', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    ProductModel.getAllProducts.mockResolvedValue(mockProducts);

    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  test('GET /products/:id should return a product by ID', async () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    ProductModel.getProductById.mockResolvedValue(mockProduct);

    const response = await request(app).get('/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
  });

  test('POST /products should create a new product', async () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    ProductModel.createProduct.mockResolvedValue(mockProduct);

    const response = await request(app).post('/products').send(mockProduct);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockProduct);
  });

  test('PUT /products/:id should update a product by ID', async () => {
    const mockProduct = { id: 1, name: 'Updated Product' };
    ProductModel.updateProductById.mockResolvedValue(mockProduct);

    const response = await request(app).put('/products/1').send(mockProduct);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
  });

  test('DELETE /products/:id should delete a product by ID', async () => {
    ProductModel.deleteProductById.mockResolvedValue();

    const response = await request(app).delete('/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'product_deleted_successfully' });
  });

  test('GET /products/search should return products based on filters', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    ProductModel.searchProductsBy.mockResolvedValue(mockProducts);

    const response = await request(app).get('/products/search?name=Product');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });
});
