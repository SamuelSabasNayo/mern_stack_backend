/**
 * This class contains method (function) required to handle.
 * All kinds of data which paginated.
 */
class PaginateData {
  /**
  * This method handle pagination of retrived data.
  * @param {object} req a datas request.
  * @param {object} res a response.
  * @returns {object} a status and data.
  */
  static paginatedRetrievedData(req, res) {
    let name;
    if (req.master) {
      name = req.master.name;
    }
    if (req.user) {
      name = req.user.lastname;
    }
    req.data.paginate.paginate = req.data.allDatata;
    if (req.data.start > 0) {
      req.data.paginate.Previous = {
        page: req.data.pages - 1,
        limit: req.data.skip
      };
    } if (req.data.end < req.data.countAllData) {
      req.data.paginate.Next = {
        page: req.data.pages + 1,
        limit: req.data.skip
      };
    }
    return res.status(200).json({
      status: 200,
      message: `${name || 'Anonyms'} Those are data from this page ${req.data.pages}`,
      data: req.data.paginate
    });
  }
}

module.exports = PaginateData;
