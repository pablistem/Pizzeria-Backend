import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileRepository } from '../../infrastructure/profile.repository';
import { IProfileRepository } from '../repository/profile.repository.interface';
import { Profile } from '../../domain/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
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

  createProfile(profile: CreateProfileDto) {
    this.profileRepository.createProfile(profile);
    return 'El perfil fue creado correctamente!';
  }
}
