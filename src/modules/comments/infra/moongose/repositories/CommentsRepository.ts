import { Comment } from '../models/Comment';
import ICreateCommentDTO from '../../../dtos/ICreateCommentDTO';
import IUpdateCommentDTO from '../../../dtos/IUpdateCommentDTO';
import ICommentsRepository from '../../../repositories/ICommentsRepository';

class CommentsRepository implements ICommentsRepository {
  public async getAll(): Promise<Comment[]> {
    return await Comment.find().exec();
  }

  public async findById(id: string): Promise<Comment | null> {
    return await Comment.findById(id).exec();
  }

  public async findByUser(userId: string): Promise<Comment[] | []> {
    return await Comment.find({ userId }).exec();
  }

  public async create(dataCreate: ICreateCommentDTO): Promise<Comment> {
    return await Comment.create(dataCreate);
  }

  public async update(dataUpdate: IUpdateCommentDTO): Promise<Comment | null> {
    await Comment.findByIdAndUpdate(dataUpdate.id, dataUpdate.comment).exec();
    return await Comment.findById(dataUpdate.id).exec();
  }

  public async delete(id: string): Promise<void> {
    await Comment.findByIdAndDelete(id).exec();
  }
}

export default CommentsRepository;
