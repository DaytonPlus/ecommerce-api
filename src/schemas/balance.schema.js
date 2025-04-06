const Joi = require('joi');

const balanceSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    'number.empty': 'user_id_required',
    'number.integer': 'user_id_must_be_integer'
  }),
  balance: Joi.number().precision(2).required().messages({
    'number.empty': 'balance_required',
    'number.precision': 'balance_precision'
  })
});

module.exports = { balanceSchema };