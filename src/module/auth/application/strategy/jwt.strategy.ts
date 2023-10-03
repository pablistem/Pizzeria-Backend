import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENVIRONMENTS } from '../../../../../ormconfig';
import { UserToken } from '../../../../../src/common/interfaces/UserRequest';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
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

  async validate(payload: UserToken) {
    return payload;
  }
}
