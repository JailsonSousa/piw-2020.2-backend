import { injectable, inject } from 'tsyringe';
import { Post } from '../infra/moongose/models/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface Request {
  id: string;
  post: {
    message: string;
    likes: number;
    userId: string;
  };
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id, post }: Request): Promise<Post | null> {
    const postUpdated = await this.postsRepository.update({
      id,
      post,
    });

    if (!postUpdated) {
      throw new Error('Não foi possivel atualizar essa postagem.');
    }

    return postUpdated;
  }
}

export default UpdatePostService;
