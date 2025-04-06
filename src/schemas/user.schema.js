import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    'string.empty': 'name_required',
    'string.min': 'name_min_length',
    'string.max': 'name_max_length'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'email_required',
    'string.email': 'invalid_email'
  }),
  password: Joi.string().required().min(8).messages({
    'string.empty': 'password_required',
    'string.min': 'password_min_length'
  }),
  is_admin: Joi.boolean().optional().default(false)
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'email_required',
    'string.email': 'invalid_email'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'password_required'
  })
});


export { userSchema, loginSchema };