import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../repository/user.repository.interface';
import { RoleEnum, User } from '../../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../infrastructure/user.repository';

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
      throw new NotFoundException();
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

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  async validateUserAdmin(userId: number): Promise<boolean> {
    const user = await this.findUserById(userId);
    return user.role === RoleEnum.admin;
  }
}
