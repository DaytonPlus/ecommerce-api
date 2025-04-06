const Joi = require('joi');

const orderSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    'number.empty': 'user_id_required',
    'number.integer': 'user_id_must_be_integer'
  }),
  total: Joi.number().precision(2).required().messages({
    'number.empty': 'total_required',
    'number.precision': 'total_precision'
  }),
  status: Joi.string().valid('pending', 'processed', 'cancelled').required().messages({
    'string.empty': 'status_required',
    'any.only': 'invalid_status'
  }),
  shipping_address: Joi.string().required().messages({
    'string.empty': 'shipping_address_required'
  }),
  shipping_status: Joi.string().valid('pending', 'shipped', 'delivered').required().messages({
    'string.empty': 'shipping_status_required',
    'any.only': 'invalid_shipping_status'
  })
});

module.exports = { orderSchema };