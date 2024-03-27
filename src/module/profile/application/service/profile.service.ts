import { 
  Injectable,
  Inject, 
  InternalServerErrorException, 
  ConflictException, 
  BadRequestException, 
  NotFoundException 
} from '@nestjs/common';
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
    if (!profileFound) throw new NotFoundException('Profile not found');
    return profileFound;
  }

  async updateProfile(
    user: number,
    changes: UpdateProfileDto,
    file: Express.Multer.File,
  ): Promise<Profile> {
    try {
      const profileFound = await this.getProfile(user);
      profileFound.avatar = file ? file.path : profileFound.avatar;
      profileFound.username = changes.username != null ? changes.username.trim() : profileFound.username;
      profileFound.name = changes.name != null ? changes.name.trim() : profileFound.name;
      profileFound.lastName = changes.lastName != null ? changes.lastName.trim() : profileFound.lastName;
      profileFound.age = changes.age != null ? parseInt(changes.age.trim()) : profileFound.age;
      profileFound.phone = changes.phone != null ? parseInt(changes.phone.trim()) : profileFound.phone;
      return await this.profileRepository.updateProfile(profileFound);
    } catch (error) {
      if (error instanceof BadRequestException) throw new BadRequestException(error.message);
      else if (error instanceof NotFoundException) throw new NotFoundException(error.message);
      else throw new InternalServerErrorException(error); 
    }
    
  }

  async createProfile(
    user: number, 
    data: CreateProfileDto, 
    file: Express.Multer.File
  ): Promise<Profile> {
    try {
      const profileFound = await this.profileRepository.findByUser(user);
      if (!profileFound) {
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
      if (error instanceof ConflictException) throw new ConflictException(error.message)
      else if (error instanceof BadRequestException) throw new BadRequestException(error.message)
      else throw new InternalServerErrorException(error); 
    }
  }
}
