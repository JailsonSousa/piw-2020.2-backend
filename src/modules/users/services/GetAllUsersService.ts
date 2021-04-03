import { injectable, inject } from 'tsyringe';
import { User } from '../infra/moongose/models/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class GetAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<User[] | []> {
    return await this.usersRepository.getAll();
  }
}

export default GetAllUsersService;
