import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../../module/user/application/service/user.service';
import { User } from '../../../../module/user/domain/user.entity';
import { ENVIRONMENTS } from '../../../../../ormconfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
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

  async validate(payload: { sub: number; email: string }) {
    const user: User = await this.userService.findUserById(payload.sub);
    delete user.hash;
    return user;
  }
}
