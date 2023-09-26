import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ENVIRONMENTS } from '../../../ormconfig';
import { UserService } from '../../../src/module/user/application/service/user.service';
import { User } from '../../../src/module/user/domain/user.entity';

export class AdminGuard extends AuthGuard('admin') {
  constructor() {
    super();
  }
}

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(config: ConfigService, private userService: UserService) {
    const options =
      config.get('NODE_ENV') === ENVIRONMENTS.AUTOMATED_TEST
        ? {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'test_secret',
          }
        : {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
          };

    super(options);
  }

  async validate(payload: { sub: number; email: string }): Promise<User> {
    const user: User = await this.userService.findUserById(payload.sub);
    delete user.hash;
    if (user.role == 'admin') {
      return user;
    } else {
      throw new HttpException(
        'Credentials insufficient to access this route',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
