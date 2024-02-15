import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './domain/profile.entity';
import { ProfileController } from './interface/profile.controller';
import { ProfileService } from './application/service/profile.service';
import { ProfileRepository } from './infrastructure/profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
})
export class ProfileModule {}
