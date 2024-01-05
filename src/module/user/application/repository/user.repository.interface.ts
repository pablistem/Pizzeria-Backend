import { User } from '../../domain/user.entity';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(user: User): Promise<User | null>;
  findOneById(id: number): Promise<User>;
  // editUser(id: number): Promise<User>;
}
