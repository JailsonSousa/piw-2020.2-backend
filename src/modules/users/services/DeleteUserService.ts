import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ id }: Request): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não existe');
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
