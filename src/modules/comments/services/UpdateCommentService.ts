import { injectable, inject } from 'tsyringe';
import { Comment } from '../infra/moongose/models/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface Request {
  id: string;
  comment: {
    message: string;
    postId: string;
    userId: string;
  };
}

@injectable()
class UpdateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({ id, comment }: Request): Promise<Comment | null> {
    const commentUpdated = await this.commentsRepository.update({
      id,
      comment,
    });

    if (!commentUpdated) {
      throw new Error('Não foi possivel atualizar esse comentário.');
    }

    return commentUpdated;
  }
}

export default UpdateCommentService;
