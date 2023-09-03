import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../application/repository/user.repository.interface';
import { User } from '../domain/user.entity';
import { Injectable } from '@nestjs/common/decorators';
import { Auth } from 'src/module/auth/domain/auth.entity';
import { Order } from 'src/module/order/domain/order.entity';

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

  async saveSession(session: Auth) {
    const userFound = await this.repository.findOne({
      where: { id: session.id },
    });
    userFound.sessions = session;
  }

  async findOneById(id: number): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async getOrderFromUser(id: number) {
    return await this.repository.find({
      relations: {
        orders:true
      }
    });
  }

  async getUserWithOrders(userId: number){
    const orderFound =  await this.repository.find({
      where:{id:userId},
      relations: {
        orders:true
      }
    });
    return orderFound
  }

}
