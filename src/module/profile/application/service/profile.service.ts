import { Injectable, HttpException, HttpStatus, Inject, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileRepository } from '../../infrastructure/profile.repository';
import { IProfileRepository } from '../repository/profile.repository.interface';
import { Profile } from '../../domain/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository) private readonly profileRepository: IProfileRepository) {}

  async getProfile(user: number): Promise<Profile> {
    const profileFound = await this.profileRepository.findByUser(user);
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    return profileFound;
  }

  async updateProfile(
    id: number,
    changes: UpdateProfileDto,
  ): Promise<Profile> {
    const profileFound = await this.getProfile(id);
    const updateProfile = Object.assign(profileFound, changes);
    return this.profileRepository.updateProfile(updateProfile);
  }

  async createProfile(user: number, data: CreateProfileDto) {
    const profileFound = await this.profileRepository.findByUser(user);
    if (!profileFound) {
      const profile = new Profile();
      profile.age = data.age;
      profile.name = data.name;
      profile.lastName = data.lastName;
      profile.phone = data.phone;
      profile.user = user;
      return await this.profileRepository.createProfile(profile);
    } else {
      throw new ConflictException('the profile has already been created!')
    }
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    try {
      const profileFound = await this.getProfile(id);
      profileFound.avatar = file.path;
      return this.profileRepository.updateProfile(profileFound);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
