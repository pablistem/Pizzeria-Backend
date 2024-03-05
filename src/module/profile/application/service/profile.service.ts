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
    @Inject(ProfileRepository) private readonly profileRepository: IProfileRepository) {}

  async getProfile(id: number): Promise<Profile> {
    const profileFound = await this.profileRepository.findByUser(id);
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    return profileFound;
  }

  async updateProfile(
    id: number,
    changes: UpdateProfileDto,
    file: Express.Multer.File,
  ): Promise<Profile> {
    const profileFound = await this.profileRepository.findById(id);
    if (!profileFound) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    const updateProfile = Object.assign(profileFound, changes);
    return this.profileRepository.updateProfile(updateProfile);
  }

  async createProfile(user: number, data: CreateProfileDto, file: Express.Multer.File) {
    try {
      const profile = new Profile();
      profile.avatar = file.path;
      profile.age = data.age;
      profile.phone = data.phone;
      profile.user = user;
      return await this.profileRepository.createProfile(profile);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
