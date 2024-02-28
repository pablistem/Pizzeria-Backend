import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../application/repository/user.repository.interface';
import { User } from '../domain/user.entity';
import { Injectable } from '@nestjs/common/decorators';
// import { getUserTestDb } from './__test__/user.test.db';

@Injectable()
export class UserRepository implements IUserRepository {
  repository: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.repository.findOne({
      where: { email },
    });
    return foundUser;
  }

  async saveUser(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: { orders: { items: true }, sessions: true, profile: true },
    });
    return user;
  }

  // async loadTestData() {
  //   const testUsers = await getUserTestDb();
  //   await this.repository.save(testUsers);
  // }
}
