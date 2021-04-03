import { container } from 'tsyringe';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/moongose/repositories/UsersRepository';

import IPostsRepository from '../../modules/posts/repositories/IPostsRepository';
import PostsRepository from '../../modules/posts/infra/moongose/repositories/PostsRepository';

import ICommentsRepository from '../../modules/comments/repositories/ICommentsRepository';
import CommentsRepository from '../../modules/comments/infra/moongose/repositories/CommentsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);
