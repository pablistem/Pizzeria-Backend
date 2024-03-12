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
    file: Express.Multer.File,
  ): Promise<Profile> {
    const profileFound = await this.getProfile(id);
    const avatar = file ? file.path : profileFound.avatar;
    const updateProfile = Object.assign(profileFound, changes, avatar);
    return this.profileRepository.updateProfile(updateProfile);
  }

  async createProfile(user: number, data: CreateProfileDto, file: Express.Multer.File) {
    try {
      const profileFound = await this.profileRepository.findByUser(user);
      if (!profileFound) {
        const profile = new Profile();
        profile.avatar = file ? file.path : null;
        profile.age = data.age;
        profile.name = data.name;
        profile.lastName = data.lastName;
        profile.phone = data.phone;
        profile.user = user;
        return await this.profileRepository.createProfile(profile);
      } else {
        throw new ConflictException('the profile has already been created!')
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message)
      } else {
        console.log(error);
        throw new InternalServerErrorException(error);
      } 
    }
    
  }
}
