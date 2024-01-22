import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from '../application/service/profile.service';
import { Profile } from '../domain/profile.entity';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfiles(): Promise<Profile[]> {
    return this.profileService.getProfiles();
  }

  @Get(':id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getProfile(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(id, profile);
  }

  @Post()
  createProfile(@Body() profile: CreateProfileDto) {
    return this.profileService.createProfile(profile);
  }
}
