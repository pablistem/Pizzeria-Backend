import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
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

  async getProfiles(userId: number) {
    const userFound = await this.userService.findUserById(userId);

    if (userFound.role === RoleEnum.admin) {
      return this.profileRepository.findAll();
    } else {
      throw new HttpException('Only admin', HttpStatus.UNAUTHORIZED);
    }
  }

  async getProfile(id: number, userId: number): Promise<Profile> {
    const profileFound = await this.profileRepository.findOne(id);
    const userFound = await this.userService.findUserById(userId);

    if (!profileFound) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    if (userFound.role === RoleEnum.admin) {
      return profileFound;
    }

    if (userFound.id === id) {
      delete profileFound.user.hash;
      delete profileFound.user.verified;
      return profileFound;
    } else {
      throw new HttpException('User Id not match', HttpStatus.UNAUTHORIZED);
    }
  }

  async updateProfile(
    id: number,
    profile: UpdateProfileDto,
    userId: number,
  ): Promise<Profile> {
    const profileFound = await this.profileRepository.findOne(id);
    const userFound = await this.userService.findUserById(userId);

    if (!profileFound) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    if (userFound.role === RoleEnum.admin) {
      const updateProfile = Object.assign(profileFound, profile);
      return this.profileRepository.updateProfile(updateProfile);
    }

    if (userFound.id === id) {
      const updateProfile = Object.assign(profileFound, profile);
      return this.profileRepository.updateProfile(updateProfile);
    } else {
      throw new HttpException('User Id not match', HttpStatus.UNAUTHORIZED);
    }
  }

  async createProfile(createProfileDto: CreateProfileDto) {
    const user = await this.userService.findUserById(createProfileDto.user);

    const userCompleted = new Profile();
    userCompleted.street = createProfileDto.street;
    userCompleted.age = createProfileDto.age;
    userCompleted.avatar = createProfileDto.avatar;
    userCompleted.height = createProfileDto.height;
    userCompleted.postalCode = createProfileDto.postalCode;
    userCompleted.user = user;

    if (!user) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    this.profileRepository.createProfile(userCompleted);
    return 'El perfil fue creado correctamente!';
  }
}
