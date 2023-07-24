import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto, LoginDto } from '../dto/index';
import { UserService } from 'src/module/user/application/service/user.service';
import { RoleEnum, User } from 'src/module/user/domain/user.entity';
import { UserRepository } from 'src/module/user/infrastructure/user.repository';
import { IUserRepository } from 'src/module/user/application/repository/user.repository.interface';
import { Auth } from '../../domain/auth.entity';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { IAuthRepository } from '../repository/auth.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService, 
  ) {}
  async signUp(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.userService.getUserByEmail(createAuthDto.email);
      if (user) {
        throw new HttpException(
          `${createAuthDto.email} already register`,
          HttpStatus.CONFLICT,
        );
      }
    } catch (err) {
      if (err == 404) {
        const hash = await argon2.hash(createAuthDto.password);
        const newUser = new User(
          createAuthDto.email,
          createAuthDto.name,
          createAuthDto.lastName,
          hash,
          true,
          RoleEnum.user,
        );
        await this.userService.addUser(newUser);
      } else {
        throw err;
      }
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    const match = await argon2.verify(user.hash, loginDto.password);
    if (!match) {
      throw new HttpException(
        'Error: Please ensure all registration fields are filled correctly.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const accessToken = await this.getRefreshToken(user);
    const session = new Auth(accessToken, user.id);
    const newSession = await this.authRepository.saveRefreshToken(session)
    user.sessions=newSession
    const loginResponse = {
      user: user.id,
      token: accessToken,
    };
    return newSession
  }

  async logOut(id:number){
    this.authRepository.removeRefreshToken(id)
  }


  async getRefreshToken(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }


}
