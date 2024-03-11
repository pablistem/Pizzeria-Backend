import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';

import { CreateAuthDto, LoginDto } from '../dto/index';
import { UserService } from '../../../user/application/service/user.service';
import { RoleEnum, User } from '../../../user/domain/user.entity';
import { Auth } from '../../domain/auth.entity';
import { AuthRepository } from '../../infrastructure/auth.repository';
import { IAuthRepository } from '../repository/auth.repository.interface';
import { ENVIRONMENTS } from '../../../../../ormconfig';
import { UserRequest } from 'src/common/interfaces/UserRequest';

@Injectable()
export class AuthService {
  private COOKIE_NAME = this.config.get('HTTPONLY_COOKIE_NAME');
  private ACCESS_TOKEN_SECRET = this.config.get('ACCESS_TOKEN_SECRET');
  private REFRESH_TOKEN_SECRET = this.config.get('REFRESH_TOKEN_SECRET');
  constructor(
    @Inject(AuthRepository)
    private readonly authRepository: IAuthRepository,
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
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

  async verifyMatch(hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async login(res: Response, loginDto: LoginDto) {
    let userFound: User | null;
    try {
      userFound = await this.userService.getUserByEmail(loginDto.email);
    } catch (err) {}

    if (userFound) {
      const match = await this.verifyMatch(userFound.hash, loginDto.password);
      if (match) {
        const refreshToken = await this.getRefreshToken(userFound);
        const session = new Auth(refreshToken, userFound);
        await this.authRepository.saveRefreshToken(session);
        await this.setCookies(res, refreshToken);
        const accessToken = this.getAccessToken(userFound);
        res.statusCode = 201;
        return { accessToken: accessToken };
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

  private async removeCookie(res: Response): Promise<void> {
    res.clearCookie(this.COOKIE_NAME, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
    });
  }

  async logOut(cookie: string, userReq: UserRequest, res: Response) {
    if (cookie === undefined ) throw new NotFoundException('cookie not found!')
    const userFound: User = await this.userService.findUserById(userReq.user.id);
    this.authRepository.removeRefreshToken(userFound.sessions.refreshToken);
    await this.removeCookie(res);
  }

  async getRefreshToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const secret =
      this.config.get('NODE_ENV') === ENVIRONMENTS.AUTOMATED_TEST
        ? 'test_secret'
        : this.REFRESH_TOKEN_SECRET;
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: 60 * 60 * 24 * 14,
    });
    return accessToken;
  }

  async decodeToken(token): Promise<any> {
    const secret =
      this.config.get('NODE_ENV') === ENVIRONMENTS.AUTOMATED_TEST
        ? 'test_secret'
        : this.ACCESS_TOKEN_SECRET;
    try {
      const decodedToken = this.jwtService.decode(token, secret);
      return decodedToken;
    } catch (error) {
      return false;
    }
  }

  private async setCookies(res: Response, refreshToken: string): Promise<void> {
    const setConfig: CookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 14 * 1000),
    };
    res.cookie(this.COOKIE_NAME, refreshToken, setConfig);
  }

  private getAccessToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const options: JwtSignOptions = {
      secret: this.ACCESS_TOKEN_SECRET,
    };
    const accessToken = this.jwtService.sign(payload, options);
    return accessToken;
  }

  async refreshToken(refreshToken: string, res: Response): Promise<string> {
    const secret =
      this.config.get('NODE_ENV') === ENVIRONMENTS.AUTOMATED_TEST
        ? 'test_secret'
        : this.REFRESH_TOKEN_SECRET;

    try {
      if (!refreshToken) throw new NotFoundException('cookie not found!')
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: secret,
      });
      const user = await this.userService.getUserByEmail(verify.email);
      const accessToken = this.getAccessToken(user);
      const newRefreshToken = await this.getRefreshToken(user);
      const newAuth = new Auth(newRefreshToken, user);
      await this.authRepository.removeRefreshToken(refreshToken);
      await this.removeCookie(res);
      await this.setCookies(res, newRefreshToken);
      await this.authRepository.saveRefreshToken(newAuth);
      return accessToken;
    } catch (error) {
      await this.removeCookie(res);
      throw new HttpException(error, 403);
    }
  }
}
