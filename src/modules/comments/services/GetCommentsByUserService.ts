import { injectable, inject } from 'tsyringe';
import { Comment } from '../infra/moongose/models/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface Request {
  id: string;
}

@injectable()
class GetCommentsByUserService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}
  public async execute({ id }: Request): Promise<Comment[] | []> {
    return await this.commentsRepository.findByUser(id);
  }
}

export default GetCommentsByUserService;
