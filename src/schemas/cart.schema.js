const Joi = require('joi');

const cartSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    'number.empty': 'user_id_required',
    'number.integer': 'user_id_must_be_integer'
  }),
  product_id: Joi.number().integer().required().messages({
    'number.empty': 'product_id_required',
    'number.integer': 'product_id_must_be_integer'
  }),
  quantity: Joi.number().integer().required().min(1).messages({
    'number.empty': 'quantity_required',
    'number.integer': 'quantity_must_be_integer',
    'number.min': 'quantity_min_value'
  })
});

module.exports = { cartSchema };