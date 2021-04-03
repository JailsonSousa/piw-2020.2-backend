import { Post } from '../models/Post';
import ICreatePostDTO from '../../../dtos/ICreatePostDTO';
import IUpdatePostDTO from '../../../dtos/IUpdatePostDTO';
import IPostsRepository from '../../../repositories/IPostsRepository';

class PostsRepository implements IPostsRepository {
  public async getAll(): Promise<Post[]> {
    return await Post.find().exec();
  }

  public async findById(id: string): Promise<Post | null> {
    return await Post.findById(id).exec();
  }

  public async findByUser(userId: string): Promise<Post[] | []> {
    return await Post.find({ userId }).exec();
  }

  public async create(dataCreate: ICreatePostDTO): Promise<Post> {
    return await Post.create(dataCreate);
  }

  public async update(dataUpdate: IUpdatePostDTO): Promise<Post | null> {
    await Post.findByIdAndUpdate(dataUpdate.id, dataUpdate.post).exec();
    return await Post.findById(dataUpdate.id).exec();
  }

  public async delete(id: string): Promise<void> {
    await Post.findByIdAndDelete(id).exec();
  }
}

export default PostsRepository;
