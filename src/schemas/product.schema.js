const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(255).messages({
    'string.empty': 'product_name_required',
    'string.min': 'product_name_min_length',
    'string.max': 'product_name_max_length'
  }),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).required().messages({
    'number.empty': 'price_required',
    'number.precision': 'price_precision'
  }),
  stock: Joi.number().integer().required().min(0).messages({
    'number.empty': 'stock_required',
    'number.integer': 'stock_must_be_integer',
    'number.min': 'stock_min_value'
  }),
  category_id: Joi.number().integer().required().messages({
    'number.empty': 'category_id_required',
    'number.integer': 'category_id_must_be_integer'
  })
});

module.exports = { productSchema };