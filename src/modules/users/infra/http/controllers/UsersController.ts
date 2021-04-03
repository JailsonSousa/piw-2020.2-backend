import { Request, Response } from 'express';

import { container } from 'tsyringe';
import GetUserByIdService from '../../../services/GetUserByIdService';
import GetAllUsersService from '../../../services/GetAllUsersService';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import UpdateUserService from '../../../services/UpdateUserService';

export default class UsersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    try {
      const getAllUsers = container.resolve(GetAllUsersService);
      const users = await getAllUsers.execute();

      return response.json(users);
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
      const getUserById = container.resolve(GetUserByIdService);
      const user = await getUserById.execute({ id });

      return response.json(user);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      return response.json(user);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { user } = request.body;

      const updateUser = container.resolve(UpdateUserService);
      const userUpdated = await updateUser.execute({
        id,
        user,
      });

      return response.json(userUpdated);
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const tokenUserId = request.user.id;
      const deleteUser = container.resolve(DeleteUserService);

      if (tokenUserId !== id)
        return response
          .status(401)
          .json({ err: 'Permission denied to delete this user' });
      await deleteUser.execute({ id });

      return response.status(204).send();
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}
