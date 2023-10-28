import { Auth } from 'src/module/auth/domain/auth.entity';
import { User } from '../../domain/user.entity';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(user: User): Promise<User | null>;
  saveSession(session: Auth): Promise<void>;
  findOneById(id: number): Promise<User>;
}