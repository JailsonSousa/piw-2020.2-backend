import { Router } from 'express';

import CommentsController from '../controllers/CommentsController';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.get('/', ensureAuthenticated, commentsController.getAll);
commentsRouter.get('/:id', ensureAuthenticated, commentsController.getById);
commentsRouter.get(
  '/usuario/:id',
  ensureAuthenticated,
  commentsController.getPostsByUser,
);
commentsRouter.post('/', ensureAuthenticated, commentsController.create);
commentsRouter.put('/:id', ensureAuthenticated, commentsController.update);
commentsRouter.delete('/:id', ensureAuthenticated, commentsController.delete);

export default commentsRouter;
