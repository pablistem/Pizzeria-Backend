import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileRepository } from '../../infrastructure/profile.repository';
import { IProfileRepository } from '../repository/profile.repository.interface';
import { Profile } from '../../domain/profile.entity';
import { UserService } from 'src/module/user/application/service/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
    private readonly userService: UserService,
  ) {}

  getProfiles() {
    return this.profileRepository.findAll();
  }

  async getProfile(id: number): Promise<Profile> {
    const profileFound = await this.profileRepository.findOne(id);

    if (!profileFound) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    return profileFound;
  }

  async updateProfile(id: number, profile: UpdateProfileDto): Promise<Profile> {
    const profileFound = await this.profileRepository.findOne(id);

    if (!profileFound) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    const updateProfile = Object.assign(profileFound, profile);
    return this.profileRepository.updateProfile(updateProfile);
  }

  async createProfile(createProfileDto: CreateProfileDto) {
    const user = await this.userService.findUserById(createProfileDto.user);
    const userCompleted = new Profile();
    (userCompleted.street = createProfileDto.street),
      (userCompleted.age = createProfileDto.age),
      (userCompleted.avatar = createProfileDto.avatar),
      (userCompleted.height = createProfileDto.height),
      (userCompleted.postalCode = createProfileDto.postalCode),
      (userCompleted.user = user);

    if (!user) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    this.profileRepository.createProfile(userCompleted);
    return 'El perfil fue creado correctamente!';
  }
}
