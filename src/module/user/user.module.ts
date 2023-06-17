import { Module } from '@nestjs/common';
import { UserService } from './application/service/user.service';
import { UserController } from './interface/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
