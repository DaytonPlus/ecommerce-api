import ProductModel from './product.model';
import { pool } from '../config/database';

jest.mock('../config/database');

describe('ProductModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts should return all products', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    pool.query.mockResolvedValue({ rows: mockProducts });

    const products = await ProductModel.getAllProducts();
    expect(products).toEqual(mockProducts);
  });

  test('getProductById should return a product by ID', async () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    pool.query.mockResolvedValue({ rows: [mockProduct] });

    const product = await ProductModel.getProductById(1);
    expect(product).toEqual(mockProduct);
  });

  test('createProduct should create a new product', async () => {
    const mockProduct = { id: 1, name: 'Product 1' };
    pool.query.mockResolvedValue({ rows: [mockProduct] });

    const newProduct = await ProductModel.createProduct(mockProduct);
    expect(newProduct).toEqual(mockProduct);
  });

  test('updateProductById should update a product by ID', async () => {
    const mockProduct = { id: 1, name: 'Updated Product' };
    pool.query.mockResolvedValue({ rows: [mockProduct] });

    const updatedProduct = await ProductModel.updateProductById(1, mockProduct);
    expect(updatedProduct).toEqual(mockProduct);
  });

  test('deleteProductById should delete a product by ID', async () => {
    pool.query.mockResolvedValue({});

    await ProductModel.deleteProductById(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM products WHERE id = $1', [1]);
  });

  test('searchProductsBy should return products based on filters', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    const filters = { name: 'Product' };
    pool.query.mockResolvedValue({ rows: mockProducts });

    const products = await ProductModel.searchProductsBy(filters);
    expect(products).toEqual(mockProducts);
  });
});
