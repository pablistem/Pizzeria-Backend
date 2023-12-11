import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) profileId: number) {
    return await this.profileService.getOne(profileId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() data: CreateProfileDto) {
    await this.profileService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Body() changes: UpdateProfileDto,
    @Param('id', ParseIntPipe) profileId: number,
  ) {
    return await this.profileService.update(changes, profileId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) profileId: number) {
    return await this.profileService.remove(profileId);
  }
}
