import { Router } from 'express';

import PostsController from '../controllers/PostsController';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.get('/', ensureAuthenticated, postsController.getAll);
postsRouter.get('/:id', ensureAuthenticated, postsController.getById);
postsRouter.get(
  '/usuario/:id',
  ensureAuthenticated,
  postsController.getPostsByUser,
);
postsRouter.post('/', ensureAuthenticated, postsController.create);
postsRouter.put('/:id', ensureAuthenticated, postsController.update);
postsRouter.delete('/:id', ensureAuthenticated, postsController.delete);

export default postsRouter;
