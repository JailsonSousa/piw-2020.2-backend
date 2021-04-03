import { injectable, inject } from 'tsyringe';
import { Post } from '../infra/moongose/models/Post';
import IPostsRepository from '../repositories/IPostsRepository';

interface Request {
  id: string;
}

@injectable()
class GetPostsByUserService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}
  public async execute({ id }: Request): Promise<Post[] | []> {
    return await this.postsRepository.findByUser(id);
  }
}

export default GetPostsByUserService;
