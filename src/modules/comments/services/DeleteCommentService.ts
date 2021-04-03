import { injectable, inject } from 'tsyringe';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface Request {
  id: string;
}

@injectable()
class DeleteCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}
  public async execute({ id }: Request): Promise<void> {
    const comment = await this.commentsRepository.findById(id);

    if (!comment) {
      throw new Error('Comentário não existe');
    }

    await this.commentsRepository.delete(id);
  }
}

export default DeleteCommentService;
