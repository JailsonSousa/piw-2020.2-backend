import { injectable, inject } from 'tsyringe';
import { Post } from '../infra/moongose/models/Post';
import IPostsRepository from '../repositories/IPostsRepository';

@injectable()
class GetAllPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}
  public async execute(): Promise<Post[] | []> {
    return await this.postsRepository.getAll();
  }
}

export default GetAllPostsService;
