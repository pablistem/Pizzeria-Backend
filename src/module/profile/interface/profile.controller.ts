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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { ProfileService } from '../application/service/profile.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';
import { CreateProfileDto } from '../application/dto/create-profile.dto';
import { UpdateProfileDto } from '../application/dto/update-profile.dto';
import { Profile } from '../domain/profile.entity';


@ApiTags('Profile')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'get the profile information and its addresses' })
  async getProfile(@Req() req: UserRequest): Promise<Profile> {
    return await this.profileService.getProfile(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new profile with or without any image file as avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ 
    type: CreateProfileDto,
    description: 'all the fields except the file should not be empty',
  })
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
        const username = req.body.username;
        const fileName = `${username}-avatar-${fileExt}`;
        cb(null, fileName);
      }
    }),
  }))
  async createProfile(
    @Body() data: CreateProfileDto,
    @Req() req: UserRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Profile> {
    return await this.profileService.createProfile(req.user.id, data, file);
  }

  @Put()
  @ApiOperation({ summary: 'Update a profile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ 
    type: UpdateProfileDto,
    description: 'all the fields are optionals',
  })
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
  ): Promise<Profile> 
  {
    return await this.profileService.updateProfile(req.user.id, profile, file);
  }
}
