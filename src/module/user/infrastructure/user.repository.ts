import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../application/repository/user.repository.interface';
import { User } from '../domain/user.entity';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { Auth } from 'src/module/auth/domain/auth.entity';
import { ConfigService } from '@nestjs/config';
import { getUserTestDb } from './__test__/user.test.db';

@Injectable()
export class UserRepository implements IUserRepository {
  repository: Repository<User>;
  constructor(
    @Inject(ConfigService) private config: ConfigService,
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(User);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async saveUser(user: User): Promise<User> {
    const savedUser = await this.repository.save(user);
    return savedUser;
  }

  async saveSession(session: Auth) {
    const userFound = await this.repository.findOne({
      where: { id: session.id },
    });
    userFound.sessions = session;
  }

  async findOneById(id: number): Promise<User> {
    return this.repository.findOne({
      where: { id },
      relations: { orders: { items: true } },
    });
  }

  async loadTestData() {
    const testUsers = await getUserTestDb();
    await this.repository.save(testUsers);
  }
}