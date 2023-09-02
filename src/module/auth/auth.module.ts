import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/auth.controller';
import { UserModule } from '../user/user.module';
import { User } from '../user/domain/user.entity';
import { Auth } from './domain/auth.entity';
import { AuthRepository } from './infrastructure/auth.repository';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserGuard } from 'src/common/guards/user.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auth]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '60h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtModule, JwtStrategy, UserGuard],
  exports:[AuthService]
})
export class AuthModule {}
