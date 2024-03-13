import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UploadedFile,
  UseGuards,
  Req,
  UseInterceptors,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { ProfileService } from '../application/service/profile.service';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { extname } from 'node:path';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: UserRequest) {
    return this.profileService.getProfile(req.user.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar', {
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const formats = ['image/jpeg', 'image/png'];
      const match = formats.some(format => format === file.mimetype)
      if (match) {
        cb(null, true)
      } else {
        cb(new UnprocessableEntityException(), false)
      }
    },
    storage: diskStorage({
      destination: 'uploads/profile',
      filename: (req, file, cb) => {
        const fileExt = extname(file.originalname);
        const name = req.body.name.toLowerCase();
        const lastName = req.body.lastName.toLowerCase();
        const fileName = `${name}-${lastName}-avatar-${fileExt}`;
        cb(null, fileName);
      }
    }),
  }))
  async createProfile(
    @Body() data: CreateProfileDto,
    @Req() req: UserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.profileService.createProfile(req.user.id, data, file);
  }

  @Put()
  @UseInterceptors(FileInterceptor('avatar', {
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const formats = ['image/jpeg', 'image/png'];
      const match = formats.some(format => format === file.mimetype)
      if(match) {
        cb(null, true)
      } else {
        cb(new UnprocessableEntityException(), false)
      }
    },
    storage: diskStorage({
      destination: 'uploads/profile',
      filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
      }
    }),
  }))
  async updateProfile(
    @Req() req: UserRequest,
    @Body() profile: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.updateProfile(req.user.id, profile, file);
  }
}
