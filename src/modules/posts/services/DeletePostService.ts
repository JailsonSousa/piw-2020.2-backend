import { injectable, inject } from 'tsyringe';
import IPostsRepository from '../repositories/IPostsRepository';

interface Request {
  id: string;
}

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}
  public async execute({ id }: Request): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new Error('Postagem não existe');
    }

    await this.postsRepository.delete(id);
  }
}

export default DeletePostService;
