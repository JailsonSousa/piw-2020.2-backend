import { User } from '../infra/moongose/models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersRepository {
  getAll(): Promise<User[] | []>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: ICreateUserDTO): Promise<User>;
  update(userData: IUpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<void>;
}
