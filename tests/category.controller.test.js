import request from 'supertest';
import express from 'express';
import CategoryController from './category.controller';
import CategoryModel from '../models/category.model';

jest.mock('../models/category.model');

const app = express();
app.use(express.json());
app.use('/categories', CategoryController);

describe('CategoryController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /categories should return all categories', async () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }];
    CategoryModel.getAllCategories.mockResolvedValue(mockCategories);

    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
  });

  test('GET /categories/:id should return a category by ID', async () => {
    const mockCategory = { id: 1, name: 'Category 1' };
    CategoryModel.getCategoryById.mockResolvedValue(mockCategory);

    const response = await request(app).get('/categories/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });

  test('POST /categories should create a new category', async () => {
    const mockCategory = { id: 1, name: 'Category 1' };
    CategoryModel.createCategory.mockResolvedValue(mockCategory);

    const response = await request(app).post('/categories').send(mockCategory);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCategory);
  });

  test('PUT /categories/:id should update a category by ID', async () => {
    const mockCategory = { id: 1, name: 'Updated Category' };
    CategoryModel.updateCategory.mockResolvedValue(mockCategory);

    const response = await request(app).put('/categories/1').send(mockCategory);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });

  test('DELETE /categories/:id should delete a category by ID', async () => {
    CategoryModel.deleteCategoryById.mockResolvedValue();

    const response = await request(app).delete('/categories/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'category_deleted_successfully' });
  });
});
