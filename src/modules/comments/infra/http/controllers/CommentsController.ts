import { Request, Response } from 'express';

import { container } from 'tsyringe';
import GetAllCommentsService from '../../../services/GetAllCommentsService';
import GetCommentByIdService from '../../../services/GetCommentByIdService';
import GetCommentsByUserService from '../../../services/GetCommentsByUserService';
import CreateCommentService from '../../../services/CreateCommentService';
import UpdateCommentService from '../../../services/UpdateCommentService';
import DeleteCommentService from '../../../services/DeleteCommentService';

export default class CommentsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const getAllComments = container.resolve(GetAllCommentsService);
    const comments = await getAllComments.execute();
    return response.json(comments);
  }

  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const getCommentById = container.resolve(GetCommentByIdService);
      const comment = await getCommentById.execute({ id });
      return response.json(comment);
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
      const getCommentsByUser = container.resolve(GetCommentsByUserService);
      const comments = await getCommentsByUser.execute({ id });
      return response.json(comments);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { message, postId } = request.body;
      const { id } = request.user;

      const createComment = container.resolve(CreateCommentService);

      const comment = await createComment.execute({
        message,
        postId,
        userId: id,
      });

      return response.json(comment);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { comment } = request.body;

      const updateComment = container.resolve(UpdateCommentService);
      const postUpdated = await updateComment.execute({
        id,
        comment,
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
      const deleteComment = container.resolve(DeleteCommentService);
      const getCommentById = container.resolve(GetCommentByIdService);

      const comment = await getCommentById.execute({ id });

      if (String(tokenUserId) !== String(comment?.userId))
        return response
          .status(401)
          .json({ err: 'Permission denied to delete this comment' });

      await deleteComment.execute({ id });

      return response.status(204).send();
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}
