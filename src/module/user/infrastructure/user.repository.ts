import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../application/repository/user.repository.interface';
import { User } from '../domain/user.entity';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
// import { getUserTestDb } from './__test__/user.test.db';

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
    return await this.repository.findOne({
      where: { email },
      relations: { sessions: true },
    });
  }

  async saveUser(user: User): Promise<User> {
    const savedUser = await this.repository.save(user);
    return savedUser;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: { orders: { items: true }, sessions: true },
    });
    return user;
  }

  // async loadTestData() {
  //   const testUsers = await getUserTestDb();
  //   await this.repository.save(testUsers);
  // }
}
