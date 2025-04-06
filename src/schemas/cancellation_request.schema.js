const Joi = require('joi');

const cancellationRequestSchema = Joi.object({
  order_id: Joi.number().integer().required().messages({
    'number.empty': 'order_id_required',
    'number.integer': 'order_id_must_be_integer'
  }),
  user_id: Joi.number().integer().required().messages({
    'number.empty': 'user_id_required',
    'number.integer': 'user_id_must_be_integer'
  }),
  reason: Joi.string().required().messages({
    'string.empty': 'reason_required'
  }),
  status: Joi.string().valid('pending', 'approved', 'rejected').optional().messages({
    'any.only': 'invalid_status'
  })
});

module.exports = { cancellationRequestSchema };