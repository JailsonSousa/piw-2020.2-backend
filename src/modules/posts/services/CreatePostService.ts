import { injectable, inject } from 'tsyringe';

import { Post } from '../infra/moongose/models/Post';
import IPostsRepository from '../repositories/IPostsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface Request {
  message: string;
  likes: number;
  userId: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ message, likes, userId }: Request): Promise<Post> {
    const checkExists = await this.usersRepository.findById(userId);

    if (!checkExists) {
      throw new Error('Não existe nenhum usuário com o ID informado.');
    }

    const post = await this.postsRepository.create({
      message,
      likes,
      userId,
    });

    return post;
  }
}

export default CreatePostService;
