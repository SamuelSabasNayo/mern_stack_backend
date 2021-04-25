import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import SessionSchema from '../models/session';

dotenv.config();

/**
* This class contains all methods (functions) required to handle
* sessionExist function.
* saveSession function.
* generateSession function.
* decodeSession function.
* destroySession function.
*/
class SessionHelper {
  /**
   * Check a session into session table in database.
   * @param {string} attribute table column.
   * @param {string} value value.
   * @returns {object} an exist session.
   */
  static async sessionExist(attribute, value) {
    const data = await SessionSchema.findOne({ [attribute]: value });
    return data;
  }

  /**
   * Save a session into session table in database.
   * @param {string} userId a user Id.
   * @param {string} firstame a user name.
   * @param {string} lastame a user name.
   * @param {string} session a user session.
   * @returns {object} a saved session.
   */
  static async saveSession(userId, firstame, lastame, session) {
    const data = await SessionSchema.create({
      userId,
      firstame,
      lastame,
      session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return data;
  }

  /**
   * Decode a session.
   * @param {string} session a user session.
   * @returns {string} a decoded session.
   */
  static async decodeSession(session) {
    const data = await jwt.verify(session, process.env.SECRET_KEY);
    return data;
  }

  /**
   * Destroy a session.
   * @param {string} attribute table column.
   * @param {string} value a user id.
   * @returns {string} a destroyed session.
   */
  static async destroySession(attribute, value) {
    const data = await SessionSchema.deleteOne({ [attribute]: value });
    return data;
  }

  /**
   * Generate a session.
   * @param {string} userId a user Id.
   * @param {string} firstame a user name.
   * @param {string} lastame a user name.
   * @param {string} email a user email.
   * @param {string} isVerified a user status.
   * @returns {object} a generated session.
   */
  static async generateSession(userId, firstame, lastame, email, isVerified) {
    let data = await this.sessionExist('userId', userId);
    if (data) { return data.session; }

    data = jwt.sign({ userId, firstame, lastame, email, isVerified }, process.env.SECRET_KEY);
    this.saveSession(userId, firstame, lastame, data);
    return data;
  }
}

export default SessionHelper;
