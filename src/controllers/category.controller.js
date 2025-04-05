import CategoryModel from '../models/category.model.js';

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_categories') });
    }
  }

  async getCategory(req, res) {
    try {
      const id = req.params.id;
      const category = await CategoryModel.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: req.t('category_not_found') });
      }
      res.json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_category') });
    }
  }

  async createCategory(req, res) {
    try {
      const newCategory = await CategoryModel.createCategory(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_creating_category') });
    }
  }

  async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const updatedCategory = await CategoryModel.updateCategory(id, req.body);
      if (!updatedCategory) {
        return res.status(404).json({ message: req.t('category_not_found') });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_updating_category') });
    }
  }

  async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      await CategoryModel.deleteCategoryById(id);
      res.status(200).json({ message: req.t('category_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_category') });
    }
  }
}

export default new CategoryController();