import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/auth.controller';
import { UserModule } from '../user/user.module';
import { User } from '../user/domain/user.entity';
import { Auth } from './domain/auth.entity';
import { AuthRepository } from './infrastructure/auth.repository';
import { JwtStrategy } from './application/strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auth]),
    UserModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
