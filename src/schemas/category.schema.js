const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required().min(3).max(255).messages({
    'string.empty': 'category_name_required',
    'string.min': 'category_name_min_length',
    'string.max': 'category_name_max_length'
  }),
  description: Joi.string().optional()
});

module.exports = { categorySchema };