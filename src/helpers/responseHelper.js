/**
* This class contains all methods (functions) required to handle
* handleSuccess function.
* handleError function.
* response function.
*/
class ResponseHelpers {
  /**
   * Handle Success.
   * @param {integer} statusCode status code.
   * @param {integer} message message.
   * @param {object} data data.
   * @returns {null} .
   */
  static handleSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  /**
   * Handle Error.
   * @param {integer} statusCode status code.
   * @param {integer} message message.
   * @returns {null} .
   */
  static handleError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
   * Handle response.
   * @param {object} res response.
   * @returns {object} response.
   */
  static response(res) {
    if (this.type === 'success') {
      return res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message,
        data: this.data,
      });
    }
    return res.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
    });
  }
}

export default ResponseHelpers;
