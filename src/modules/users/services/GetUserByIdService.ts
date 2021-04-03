import { injectable, inject } from 'tsyringe';
import { User } from '../infra/moongose/models/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  id: string;
}

@injectable()
class GetUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ id }: Request): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não existe');
    }

    return user;
  }
}

export default GetUserByIdService;
