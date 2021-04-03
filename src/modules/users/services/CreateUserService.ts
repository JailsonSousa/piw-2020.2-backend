import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { User } from '../infra/moongose/models/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkExists = await this.usersRepository.findByEmail(email);

    if (checkExists) {
      throw new Error('Email informado já está em usado.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
