import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status';

import userHelper from '../helpers/userHelper';
import sessionHelper from '../helpers/sessionHelper';
import responseHelper from '../helpers/responseHelper';

dotenv.config();

/**
   * Handle verifyLogin.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const verifyLogin = async (req, res, next) => {
  try {
    console.log('verifyLogin fxn triggered');
    const userExist = await userHelper.userExist('email', req.body.email);
    if (userExist) {
      if (userExist.isVerified === false) {
        responseHelper.handleError(UNAUTHORIZED, 'User account is not verified, Please verify account before procced');
        return responseHelper.response(res);
      }

      req.user = userExist;
      return next();
    }

    responseHelper.handleError(NOT_FOUND, 'User account not found, Check email and password.');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

/**
   * Handle verifySesion.
   * @param {object} req user request.
   * @param {object} res data response.
   * @param {object} next move.
   * @returns {object} response.
   */
const verifySesion = async (req, res, next) => {
  try {
    console.log('verifySesion fxn triggered');

    const verify = jwt.verify(req.header('session'), process.env.SECRET_KEY);
    if (verify.userId) {
      const userExist = await userHelper.userExist('_id', verify.userId);
      const sessionExist = await sessionHelper.sessionExist('session', req.header('session'));

      if (userExist) {
        if (sessionExist) {
          req.user = userExist;
          return next();
        }

        responseHelper.handleError(UNAUTHORIZED, 'Already logged out. Sign in and try again..');
        return responseHelper.response(res);
      }
    }

    responseHelper.handleError(NOT_FOUND, 'User account not found,  Please create account and try again.');
    return responseHelper.response(res);
  } catch (error) {
    responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
    return responseHelper.response(res);
  }
};

export { verifyLogin, verifySesion };
