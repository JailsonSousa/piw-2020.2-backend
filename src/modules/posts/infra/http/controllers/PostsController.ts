import { Request, Response } from 'express';

import { container } from 'tsyringe';
import GetAllPostsService from '../../../services/GetAllPostsService';
import GetPostByIdService from '../../../services/GetPostByIdService';
import GetPostsByUserService from '../../../services/GetPostsByUserService';
import CreatePostService from '../../../services/CreatePostService';
import UpdatePostService from '../../../services/UpdatePostService';
import DeletePostService from '../../../services/DeletePostService';

export default class PostsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const getAllPosts = container.resolve(GetAllPostsService);
      const posts = await getAllPosts.execute();
      return response.json(posts);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const getPostById = container.resolve(GetPostByIdService);
      const post = await getPostById.execute({ id });
      return response.json(post);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async getPostsByUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const getPostsByUser = container.resolve(GetPostsByUserService);
      const posts = await getPostsByUser.execute({ id });
      return response.json(posts);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { message } = request.body;
      const { id } = request.user;

      const createPost = container.resolve(CreatePostService);

      const post = await createPost.execute({
        message,
        likes: 0,
        userId: id,
      });

      return response.json(post);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { post } = request.body;

      const updatePost = container.resolve(UpdatePostService);
      const postUpdated = await updatePost.execute({
        id,
        post,
      });

      return response.json(postUpdated);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const tokenUserId = request.user.id;
      const getPostById = container.resolve(GetPostByIdService);
      const deletePost = container.resolve(DeletePostService);

      const post = await getPostById.execute({ id });

      if (String(tokenUserId) !== String(post?.userId))
        return response
          .status(401)
          .json({ err: 'Permission denied to delete this post' });

      await deletePost.execute({ id });

      return response.status(204).send();
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}
