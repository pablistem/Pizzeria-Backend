import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository.interface';
import { User } from '../../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../infrastructure/user.repository';
import { Auth } from '../../../../../src/module/auth/domain/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    @InjectRepository(User)
    private readonly userRepository: IUserRepository,
  ) {}
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException()
    }
    return user;
  }

  async addUser(user: User): Promise<User> {
    if (!(user instanceof User)) {
      throw new HttpException(
        'To create a user, the data must be instantiated.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const saveUser = await this.userRepository.saveUser(user);

    return saveUser;
  }

  async saveSession(session:Auth){
    this.userRepository.saveSession(session)
  }
}
