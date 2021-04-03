import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', ensureAuthenticated, usersController.getAll);
usersRouter.get('/:id', ensureAuthenticated, usersController.getById);
usersRouter.post('/', usersController.create);
usersRouter.put('/:id', ensureAuthenticated, usersController.update);
usersRouter.delete('/:id', ensureAuthenticated, usersController.delete);

export default usersRouter;
