import { injectable, inject } from 'tsyringe';
import { Post } from '../infra/moongose/models/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface Request {
  id: string;
}

@injectable()
class GetPostByIdService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}
  public async execute({ id }: Request): Promise<Post | null> {
    return await this.postsRepository.findById(id);
  }
}

export default GetPostByIdService;
