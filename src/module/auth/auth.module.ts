import { Module } from '@nestjs/common';
import { AuthService } from './application/service/auth.service';
import { AuthController } from './interface/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
