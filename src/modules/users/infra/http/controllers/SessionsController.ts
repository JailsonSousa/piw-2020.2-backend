import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      const userWithoutPassword = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      return response.json({ user: userWithoutPassword, token });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }
}
