import { injectable, inject } from 'tsyringe';
import { Comment } from '../infra/moongose/models/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface Request {
  id: string;
}

@injectable()
class GetCommentByIdService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}
  public async execute({ id }: Request): Promise<Comment | null> {
    return await this.commentsRepository.findById(id);
  }
}

export default GetCommentByIdService;
