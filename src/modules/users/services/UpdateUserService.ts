import { injectable, inject } from 'tsyringe';
import { User } from '../infra/moongose/models/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  id: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, user }: Request): Promise<User | null> {
    const userUpdated = await this.usersRepository.update({
      id,
      user,
    });

    if (!userUpdated) {
      throw new Error('Email informado já está em usado.');
    }

    return userUpdated;
  }
}

export default UpdateUserService;
