import Router from 'express';
import multiparty from 'connect-multiparty';
import paginate from '../middlewares/paginateMiddleware';
import userController from '../controllers/userController';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import { validateEditUser } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const router = Router();
router
  .delete('/remove-user/:userId', verifySesion, userController.removeUser)
  // .get('/view-users', verifySesion, userController.viewUsers, paginate.paginatedRetrievedData)
  .get('/view-users', verifySesion, (req, res) => res.json({ message: 'Users retrieved successfully',
    data: [
      { id: 1, firstname: 'Sam', lastname: 'Nayo', email: 'sam@nayo.com' },
      { id: 2, firstname: 'eee', lastname: 'ffff', email: 'eee@ffff.com' },
      { id: 3, firstname: 'aaa', lastname: 'bbb', email: 'aaa@bbb.com' },
      { id: 4, firstname: 'ccc', lastname: 'ddd', email: 'ccc@ddd.com' },
    ]
  }))
  .patch('/edit-user/:userId', verifySesion, multipart, validateEditUser, userController.updateUser)
  .patch('/edit-profile', verifySesion, multipart, validateEditUser, userController.updateUserProfile);

export default router;
