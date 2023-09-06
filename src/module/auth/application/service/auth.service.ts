import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { CreateAuthDto, LoginDto } from '../dto/index';
import { UserService } from '../../../user/application/service/user.service';
import { RoleEnum, User } from '../../../user/domain/user.entity';
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
    private config: ConfigService
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
      if (err instanceof NotFoundException) {
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
    let userFound: User | null;
    try {
      userFound = await this.userService.getUserByEmail(loginDto.email);
    } catch (err) {}

    if (userFound) {
      const match = await argon2.verify(userFound.hash, loginDto.password);
      if (match) {
        const accessToken = await this.getRefreshToken(userFound);
        const session = new Auth(accessToken, userFound.id);
        const newSession = await this.authRepository.saveRefreshToken(session);
        userFound.sessions = newSession;
        const loginResponse = {
          user: userFound.id,
          token: accessToken,
        };
        return loginResponse;
      } else {
        throw new HttpException(
          'Error: Please ensure all registration fields are filled correctly.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        'Error: Please ensure all registration fields are filled correctly.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async logOut(id: number) {
    this.authRepository.removeRefreshToken(id);
  }

  async getRefreshToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const secret = this.config.get('ACCESS_TOKEN_SECRET')
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: '15min',
    });
    return accessToken;
  }

  async decodedToken(token): Promise<Object> {
    try {
      const decodedToken = this.jwtService.decode(token);
      return decodedToken;
    } catch (error) {
      return false;
    }
  }
}
