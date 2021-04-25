import { BAD_REQUEST } from 'http-status';
import helper from '../helpers/responseHelper';

/**
   * Handle Success.
   * @param {object} schema schema.
   * @param {object} body user body request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const validateSchema = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const errors = error.details.map((err) => err.message);
    helper.handleError(BAD_REQUEST, errors[0].replace(/"/g, ''));
    return helper.response(res);
  }

  return next();
};

export default validateSchema;
