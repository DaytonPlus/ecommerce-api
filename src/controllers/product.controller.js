import ProductModel from '../models/product.model.js';

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_products') });
    }
  }

  async getProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: req.t('product_not_found') });
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_getting_product') });
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = await ProductModel.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_creating_product') });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const updatedProduct = await ProductModel.updateProductById(id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: req.t('product_not_found') });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_updating_product') });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      await ProductModel.deleteProductById(id);
      res.status(200).json({ message: req.t('product_deleted_successfully') });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_deleting_product') });
    }
  }

  async searchProducts(req, res) {
    try {
      const filters = req.query; // Los filtros se envían como parámetros de consulta (query params)
      const products = await ProductModel.searchProductsBy(filters);
      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: req.t('error_searching_products') });
    }
  }
}

export default new ProductController();