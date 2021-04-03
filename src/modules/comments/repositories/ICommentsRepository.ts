import { Comment } from '../infra/moongose/models/Comment';
import ICreateCommentDTO from '../dtos/ICreateCommentDTO';
import IUpdateCommentDTO from '../dtos/IUpdateCommentDTO';

export default interface ICommentsRepository {
  getAll(): Promise<Comment[] | []>;
  findById(id: string): Promise<Comment | null>;
  findByUser(userId: string): Promise<Comment[] | []>;
  create(commentData: ICreateCommentDTO): Promise<Comment>;
  update(commentData: IUpdateCommentDTO): Promise<Comment | null>;
  delete(id: string): Promise<void>;
}
