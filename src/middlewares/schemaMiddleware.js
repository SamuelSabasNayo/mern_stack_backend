import Joi from 'joi';
import validateSchema from './validateSchema';

/**
   * Handle validateRegisterUser.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const validateRegisterUser = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      profilePicture: Joi.string()
        .messages({
          'any.required': 'profilePicture is required',
          'string.empty': 'profilePicture is not allowed to be empty',
        }),
      userName: Joi.string().min(3).max(50).required()
        .messages({
          'any.required': 'Full Name is required',
          'string.empty': 'Full Name is not allowed to be empty',
        }),
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is not allowed to be empty',
        'string.email': 'Email must be a valid email',
      }),
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

/**
   * Handle validateEditUser.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const validateEditUser = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      profilePicture: Joi.string()
        .messages({
          'any.required': 'profilePicture is required',
          'string.empty': 'profilePicture is not allowed to be empty',
        }),
      userName: Joi.string().min(3).max(50)
        .messages({
          'any.required': 'Full Name is required',
          'string.empty': 'Full Name is not allowed to be empty',
        }),
      email: Joi.string().email().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is not allowed to be empty',
        'string.email': 'Email must be a valid email',
      }),
      password: Joi.string()
        .regex(
          /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/,
        )
        .messages({
          'any.required': 'password is a required field',
          'string.pattern.base': 'password must be at least 8 characters long with a number, Upper and lower cases, and a special character',
        }),
      confirmPassword: Joi.string().valid(Joi.ref('password')),
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

/**
   * Handle validateLoginUser.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const validateLoginUser = (req, res, next) => {
  console.log('validateLoginUser fxn triggered');
  const dataSchema = Joi.object()
    .keys({
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is not allowed to be empty',
        'string.email': 'Email must be a valid email',
      }),
      password: Joi.string()
        .required()
        .regex(
          /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/,
        )
        .messages({
          'any.required': 'password is a required field',
          'string.pattern.base': 'password must be at least 8 characters long with a number, Upper and lower cases, and a special character',
        }),
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

/**
   * Handle validateResend.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const validateResend = (req, res, next) => {
  const dataSchema = Joi.object()
    .keys({
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is not allowed to be empty',
        'string.email': 'Email must be a valid email',
      }),
    })
    .options({ abortEarly: false });

  return validateSchema(dataSchema, req.body, res, next);
};

export { validateRegisterUser, validateEditUser, validateLoginUser, validateResend };
