import { injectable, inject } from 'tsyringe';

import { Comment } from '../infra/moongose/models/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface Request {
  message: string;
  postId: string;
  userId: string;
}

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ message, postId, userId }: Request): Promise<Comment> {
    const checkExists = await this.usersRepository.findById(userId);

    if (!checkExists) {
      throw new Error('Não existe nenhum usuário com o ID informado.');
    }

    const post = await this.commentsRepository.create({
      message,
      postId,
      userId,
    });

    return post;
  }
}

export default CreateCommentService;
