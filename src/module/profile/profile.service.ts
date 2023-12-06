import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { ProfileRepository } from './infrastructure/profile.repository';
import { IProfileRepository } from './repository/profile.repository.entity';
import { ICreateProfile, IUpdateProfile } from './interfaces/profile.service';
import { Profile } from './domain/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async getOne(id: number): Promise<Profile> {
    try {
      return await this.profileRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async create(profile: ICreateProfile): Promise<HttpException | Profile> {
    try {
      return await this.profileRepository.save(profile);
    } catch (error) {
      throw new BadRequestException('All the fields should be filled out');
    }
  }

  async update(changes: IUpdateProfile, profileId: number): Promise<Profile> {
    const profileFound = this.profileRepository.findOne(profileId);
    if (!profileFound) {
      throw new NotFoundException('profile not found');
    }
    return await this.profileRepository.update(changes);
  }

  async remove(id: number) {
    const profileFound = await this.profileRepository.findOne(id);
    if (!profileFound) {
      throw new NotFoundException('profile not found');
    } else {
      return await this.profileRepository.delete(profileFound.id);
    }
  }
}
