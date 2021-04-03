import { Post } from '../infra/moongose/models/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';
import IUpdatePostDTO from '../dtos/IUpdatePostDTO';

export default interface IPostsRepository {
  getAll(): Promise<Post[] | []>;
  findById(id: string): Promise<Post | null>;
  findByUser(userId: string): Promise<Post[] | []>;
  create(postData: ICreatePostDTO): Promise<Post>;
  update(postData: IUpdatePostDTO): Promise<Post | null>;
  delete(id: string): Promise<void>;
}
