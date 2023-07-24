import { Module } from '@nestjs/common';
import { UserService } from './application/service/user.service';
import { UserController } from './interface/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { databaseProviders } from 'ormconfig';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
