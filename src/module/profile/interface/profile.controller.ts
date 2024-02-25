import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from '../application/service/profile.service';
import { Profile } from '../domain/profile.entity';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfiles(@Req() req: UserRequest): Promise<Profile[]> {
    return this.profileService.getProfiles(req.user.id);
  }

  @Get('id')
  getProfile(@Req() req: UserRequest) {
    return this.profileService.getProfile(req.user.profile);
  }

  @Put(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: UpdateProfileDto,
    @Req() req: UserRequest,
  ) {
    return this.profileService.updateProfile(id, profile, req.user.id);
  }

  @Post()
  createProfile(@Body() profile: CreateProfileDto) {
    return this.profileService.createProfile();
  }
}
