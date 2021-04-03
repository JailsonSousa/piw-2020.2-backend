import { User } from '../models/User';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../../dtos/IUpdateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  public async getAll(): Promise<User[]> {
    return await User.find().exec();
  }

  public async findById(id: string): Promise<User | null> {
    return await User.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ email }).exec();
  }

  public async create(dataCreate: ICreateUserDTO): Promise<User> {
    return await User.create(dataCreate);
  }

  public async update(dataUpdate: IUpdateUserDTO): Promise<User | null> {
    await User.findByIdAndUpdate(dataUpdate.id, dataUpdate.user).exec();
    return await User.findById(dataUpdate.id).exec();
  }

  public async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id).exec();
  }
}

export default UsersRepository;
