import { Injectable, HttpException, HttpStatus, Inject, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
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
    const username = changes.username != null ? changes.username : profileFound.username;
    const name = changes.name != null ? changes.name : profileFound.name;
    const lastName = changes.lastName != null ? changes.lastName : profileFound.lastName;
    const age = changes.age != null ? changes.age : profileFound.age.toString();
    const phone = changes.phone != null ? changes.phone : profileFound.phone.toString();
    if (/^[a-zA-Z0-9-_]+$/.test(username) === false) throw new BadRequestException('the username should not contain any of the followings: {}[]()^*¿?¡!.,;:!');
    if (/^[a-zA-Z]+$/.test(name) === false) throw new BadRequestException('name should not contain any number!');
    if (/^[a-zA-Z]+$/.test(lastName) === false) throw new BadRequestException('last name should not contain any number!');
    if (/^\d+$/.test(age) === false) throw new BadRequestException('age should be a number!');
    if (/^\d+$/.test(phone) === false) throw new BadRequestException('phone should be a number!');
    profileFound.avatar = file ? file.path : profileFound.avatar;
    profileFound.username = username.trim();
    profileFound.name = name.trim();
    profileFound.lastName = lastName.trim();
    profileFound.age = parseInt(age.trim());
    profileFound.phone = parseInt(phone.trim());
    return this.profileRepository.updateProfile(profileFound);
  }

  async createProfile(user: number, data: CreateProfileDto, file: Express.Multer.File) {
    try {
      const profileFound = await this.profileRepository.findByUser(user);
      if (!profileFound) {
        if (/^[a-zA-Z0-9-_]+$/.test(data.username) === false) throw new BadRequestException('the username should not contain any special character except: "-" or "_"');
        if (/^[a-zA-Z]+$/.test(data.name) === false) throw new BadRequestException('name should not contain any number!');
        if (/^[a-zA-Z]+$/.test(data.lastName) === false) throw new BadRequestException('last name should not contain any number!');
        if (/^\d+$/.test(data.age) === false) throw new BadRequestException('age should be a number!');
        if (/^\d+$/.test(data.phone) === false) throw new BadRequestException('phone should be a number!');
        const profile = new Profile();
        profile.avatar = file ? file.path : null;
        profile.username = data.username;
        profile.name = data.name.trim();
        profile.lastName = data.lastName.trim();
        profile.age = parseInt(data.age.trim());
        profile.phone = parseInt(data.phone.trim());
        profile.user = user;
        return await this.profileRepository.createProfile(profile);
      } else {
        throw new ConflictException('the profile has already been created!')
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message)
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message)
      } else {
        throw new InternalServerErrorException(error);
      } 
    }
  }
}
