import { Injectable, HttpException, HttpStatus, Inject, InternalServerErrorException } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileRepository } from '../../infrastructure/profile.repository';
import { IProfileRepository } from '../repository/profile.repository.interface';
import { Profile } from '../../domain/profile.entity';
import { UserService } from 'src/module/user/application/service/user.service';
import { RoleEnum, User } from 'src/module/user/domain/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
    private readonly userService: UserService,
  ) {}

  async getProfile(id: number): Promise<Profile> {
    const profileFound = await this.profileRepository.findOne(id);
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    if(profileFound) {
      if (!profileFound.age && 
          !profileFound.avatar && 
          !profileFound.height && 
          !profileFound.postalCode && 
          !profileFound.street) 
      {
        return null;
      }
    }
    return profileFound;
  }

  async fillProfile(profileId: number, profile: CreateProfileDto) {
    const profileFound = await this.profileRepository.findOne(profileId);
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    const updateProfile = Object.assign(profileFound, profile);
    return this.profileRepository.updateProfile(updateProfile);
  }

  async updateProfile(
    profile: UpdateProfileDto,
    profileId: number,
  ): Promise<Profile> {
    const profileFound = await this.profileRepository.findOne(profileId);
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    const updateProfile = Object.assign(profileFound, profile);
    return this.profileRepository.updateProfile(updateProfile);
  }

  async createProfile() {
    try {
      return await this.profileRepository.createProfile();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
