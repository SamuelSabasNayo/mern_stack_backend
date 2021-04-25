import dotenv from 'dotenv';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, OK } from 'http-status';

import userHelper from '../helpers/userHelper';
import pagination from '../helpers/paginateHelper';
import sessionHelper from '../helpers/sessionHelper';
import responseHelper from '../helpers/responseHelper';
import imageService from '../services/cloudinaryHelper';

dotenv.config();
/**
* This class contains all methods (functions) required to handle
* registerUser function.
* verifyAccount function.
* resentVerificationLink function.
* loginUser function.
*/
class UserController {
  /**
     * Handle updateUserProfile.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async updateUserProfile(req, res) {
    try {
      let document = null;
      if (req.files.profilePicture) {
        document = await imageService(req.files.profilePicture);
        if (document === 'Error' || document === undefined) {
          responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
          return responseHelper.response(res);
        }
      }

      const user = await userHelper.updateUserProfile(req.body, document, req.user);
      const data = { session: await sessionHelper.generateSession(user.id, user.userName, user.email, user.isVerified), user };

      responseHelper.handleSuccess(OK, 'User updated successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle updateUser.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async updateUser(req, res) {
    try {
      let document = null;
      if (req.files.profilePicture) {
        document = await imageService(req.files.profilePicture);
        if (document === 'Error' || document === undefined) {
          responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
          return responseHelper.response(res);
        }
      }

      const existUser = await userHelper.userExist('_id', req.params.userId);
      if (!existUser) {
        responseHelper.handleError(NOT_FOUND, 'User account not found');
        return responseHelper.response(res);
      }

      if (existUser.parentId !== req.user.id) {
        responseHelper.handleError(UNAUTHORIZED, 'User not belong to you');
        return responseHelper.response(res);
      }

      if (existUser.isVerified === true) {
        responseHelper.handleError(UNAUTHORIZED, 'User already verified his/her account');
        return responseHelper.response(res);
      }

      const data = await userHelper.updateUser(req.body, document, existUser);
      responseHelper.handleSuccess(OK, 'User updated successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle updateUser.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async removeUser(req, res) {
    try {
      const existUser = await userHelper.userExist('_id', req.params.userId);
      if (!existUser) {
        responseHelper.handleError(NOT_FOUND, 'User account not found');
        return responseHelper.response(res);
      }

      if (existUser.parentId !== req.user.id) {
        responseHelper.handleError(UNAUTHORIZED, 'User not belong to you');
        return responseHelper.response(res);
      }

      if (existUser.isVerified === true) {
        responseHelper.handleError(UNAUTHORIZED, 'User already verified his/her account');
        return responseHelper.response(res);
      }

      await userHelper.removeUser(req.params.userId);
      responseHelper.handleSuccess(OK, 'User removed successfully');
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle viewUsers.
     * @param {object} req user request.
     * @param {object} res data response.
     * @param {object} next move data response.
     * @returns {object} response.
     */
  static async viewUsers(req, res, next) {
    try {
      const { start, end, pages, skip, paginate } = await pagination.paginateData(req.query);
      const fetchedData = await userHelper.viewUsers(skip, start, 'parentId', req.user.id);
      const countedData = await userHelper.countUserData('parentId', req.user.id);

      const allDatata = fetchedData;
      const countAllData = countedData;

      if (countAllData < 1) {
        responseHelper.handleError(NOT_FOUND, `${req.user.userName || 'Anonymus'} data not found at the moment`);
        return responseHelper.response(res);
      }

      req.data = { allDatata, countAllData, start, end, pages, skip, paginate };
      next();
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }
}

export default UserController;
