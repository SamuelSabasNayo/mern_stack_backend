import UserSchema from '../models/user';
import passwordHelper from './passwordHelper';

/**
* This class contains all methods (functions) required to handle
* userExist function.
* saveUser function.
* verifyAccount function.
* save a new user into database and return created user.
*/
class UserHelper {
  /**
   * Register a user into users table in database.
   * @param {object} body user details.
   * @param {string} status true/false.
   * @returns {object} registered user details.
   */
  static async registerUser(body, status) {
    const data = await UserSchema.create({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: passwordHelper.hashPassword(body.password),
      isVerified: status,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return data;
  }

  /**
   * Check a user into users table in database.
   * @param {string} attribute table column.
   * @param {string} value user details.
   * @returns {object} exist user.
   */
  static async userExist(attribute, value) {
    console.log('userExist fxn triggered');
    const data = await UserSchema.findOne({ [attribute]: value });
    return data;
  }

  /**
   * count user data from users table in database.
   * @param {string} attribute table column.
   * @param {string} value user details.
   * @returns {object} exist user.
   */
  static async countUserData(attribute, value) {
    const data = await UserSchema.countDocuments({ [attribute]: value });
    return data;
  }

  /**
   * view users from users table in database.
   * @param {string} skip where to stop.
   * @param {string} start where to start.
   * @param {string} attribute table column.
   * @param {string} value user details.
   * @returns {object} exist user.
   */
  static async viewUsers(skip, start, attribute, value) {
    const data = await UserSchema.find({ [attribute]: value }).skip(start).limit(skip).sort({ updatedAt: -1 });
    return data;
  }

  /**
   * Save a user into users table in database.
   * @param {object} body user details.
   * @param {string} generatedPassword user password.
   * @param {string} document user profile picture.
   * @param {string} status true/false.
   * @param {string} parentId parent id.
   * @returns {object} saved user details.
   */
  static async saveUser(body, generatedPassword, document, status, parentId) {
    const data = await UserSchema.create({
      profile: document,
      parentId,
      firstname: body.firstname,
      lastame: body.lastame,
      email: body.email,
      isVerified: status,
      password: passwordHelper.hashPassword(generatedPassword),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return data;
  }

  /**
   * Update user profile into users table in database.
   * @param {object} body user details.
   * @param {string} document user profile picture.
   * @param {string} existUser user existing details.
   * @returns {object} updated user details.
   */
  static async updateUserProfile(body, document, existUser) {
    let data = await UserSchema.updateOne({ _id: existUser.id },
      {
        $set: {
          profile: document || existUser.profile,
          firstname: body.firstname ? body.firstname : existUser.firstname,
          email: body.email ? body.email : existUser.email,
          password: body.password ? passwordHelper.hashPassword(body.password) : existUser.password,
        }
      }
    );

    if (data.ok === 1) {
      data = await this.userExist('_id', existUser.id);
      return data;
    }

    return null;
  }

  /**
   * verify user profile into users table in database.
   * @param {string} id table attribute.
   * @param {string} status account status.
   * @returns {object} updated user details.
   */
  static async verifyUserProfile(id, status) {
    let data = await UserSchema.updateOne({ _id: id },
      {
        $set: {
          isVerified: status
        }
      }
    );

    if (data.ok === 1) {
      data = await this.userExist('_id', id);
      return data;
    }

    return null;
  }

  /**
   * Update user details into users table in database.
   * @param {object} body user details.
   * @param {string} document user profile picture.
   * @param {string} existUser user existing details.
   * @returns {object} updated user details.
   */
  static async updateUser(body, document, existUser) {
    let data = await UserSchema.updateOne({ _id: existUser.id },
      {
        $set: {
          profile: document || existUser.profile,
          firstname: body.firstname ? body.firstname : existUser.firstname,
          email: body.email ? body.email : existUser.email,
          password: body.password ? passwordHelper.hashPassword(body.password) : existUser.password,
        }
      }
    );

    if (data.ok === 1) {
      data = await this.userExist('_id', existUser.id);
      return data;
    }

    return null;
  }

  /**
   * remove User.
   * @param {string} id a user id.
   * @returns {string} a destroyed session.
   */
  static async removeUser(id) {
    const data = await UserSchema.deleteOne({ _id: id });
    return data;
  }
}

export default UserHelper;
