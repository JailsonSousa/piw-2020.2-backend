import { injectable, inject } from 'tsyringe';
import { Comment } from '../infra/moongose/models/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

@injectable()
class GetAllCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}
  public async execute(): Promise<Comment[] | []> {
    return await this.commentsRepository.getAll();
  }
}

export default GetAllCommentsService;
