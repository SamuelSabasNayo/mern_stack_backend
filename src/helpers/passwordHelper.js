import bcrypt from 'bcryptjs';

/**
* This class contains all methods (functions) required to handle
* save a new user into database and return created user
*/
class PasswordHelper {
  /**
   * Harsh a user password.
   * @param {string} password user password.
   * @returns {string} harshed password.
   */
  static hashPassword(password) {
    // file deepcode ignore HardcodedSecret: <please specify a reason of ignoring this>
    return bcrypt.hashSync(password, 10);
  }

  /**
   * compare a user password and password from database.
   * @param {string} plainPassword user password.
   * @param {string} hashedPassword database password.
   * @returns {string} harshed password.
   */
  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default PasswordHelper;
