import {
  Controller,
  Get,
  Body,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from '../application/service/profile.service';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';
import { CreateProfileDto } from '../application/dto/create-profile.dto';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() req: UserRequest) {
    return this.profileService.getProfile(req.user.profile);
  }

  @Put('fill')
  fillProfile(
    @Body() profile: CreateProfileDto,
    @Req() req: UserRequest,
  ) {
    return this.profileService.fillProfile(req.user.profile, profile);
  }

  @Put('update')
  updateProfile(
    @Body() profile: UpdateProfileDto,
    @Req() req: UserRequest,
  ) {
    return this.profileService.updateProfile(profile, req.user.profile);
  }
}
