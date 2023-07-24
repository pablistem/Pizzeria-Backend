import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../application/repository/user.repository.interface';
import { User } from '../domain/user.entity';
import { Injectable } from '@nestjs/common/decorators';
import { Auth } from 'src/module/auth/domain/auth.entity'; 

@Injectable()
export class UserRepository implements IUserRepository {
  repository: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async saveUser(user: User): Promise<User> {
    const savedUser = await this.repository.save(user);
    return savedUser;
  }

  async saveSession(session:Auth){
    const userFound = await this.repository.findOne({where: {id : session.id}})
    userFound.sessions = session
  }
}
