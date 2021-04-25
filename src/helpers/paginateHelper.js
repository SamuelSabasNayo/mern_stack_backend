
/**
* This class contain method (function) required to handle
* The method return data.
*/
class PaginatingData {
  /**
   * Get page number and limit of data needed on single page.
   * @param {integer} page page number.
   * @param {integer} limit value to be found.
   * @returns {object} paginate tools.
   */
  static paginateData({ page, limit }) {
    const paginate = {};
    const skip = Number(limit || Number.MAX_SAFE_INTEGER);
    const pages = Number(page || 1);
    const start = Number((pages - 1) * skip);
    const end = page * skip;
    return {
      start, end, pages, skip, paginate
    };
  }
}

module.exports= PaginatingData;
