import CategoryModel from './category.model';
import { pool } from '../config/database';

jest.mock('../config/database');

describe('CategoryModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllCategories should return all categories', async () => {
    const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
    pool.query.mockResolvedValue({ rows: mockCategories });

    const categories = await CategoryModel.getAllCategories();
    expect(categories).toEqual(mockCategories);
  });

  test('getCategoryById should return a category by ID', async () => {
    const mockCategory = { id: 1, name: 'Category 1' };
    pool.query.mockResolvedValue({ rows: [mockCategory] });

    const category = await CategoryModel.getCategoryById(1);
    expect(category).toEqual(mockCategory);
  });

  test('createCategory should create a new category', async () => {
    const mockCategory = { id: 1, name: 'Category 1' };
    pool.query.mockResolvedValue({ rows: [mockCategory] });

    const newCategory = await CategoryModel.createCategory(mockCategory);
    expect(newCategory).toEqual(mockCategory);
  });

  test('updateCategory should update a category by ID', async () => {
    const mockCategory = { id: 1, name: 'Updated Category' };
    pool.query.mockResolvedValue({ rows: [mockCategory] });

    const updatedCategory = await CategoryModel.updateCategory(1, mockCategory);
    expect(updatedCategory).toEqual(mockCategory);
  });

  test('deleteCategoryById should delete a category by ID', async () => {
    pool.query.mockResolvedValue({});

    await CategoryModel.deleteCategoryById(1);
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM categories WHERE id = $1', [1]);
  });
});
