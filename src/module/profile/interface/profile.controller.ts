import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UploadedFile,
  UseGuards,
  Req,
  ParseIntPipe,
  ParseFilePipeBuilder,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
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
  async getProfile(@Req() req: UserRequest) {
    return this.profileService.getProfile(req.user.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar', { 
    storage: diskStorage({
      destination: 'uploads/profile',
      filename: (req, file, cb) => {
        const extName = extname(file.originalname);
        const fileName = `${file.originalname}-${extName}`;
        cb(null, fileName);
      }
    }),
  }))
  async createProfile(
    @Body() data: CreateProfileDto,
    @Req() req: UserRequest,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'jpeg' })
      .addMaxSizeValidator({ maxSize: 2 * 1024 * 1024 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    ) file: Express.Multer.File
  ) {
    return await this.profileService.createProfile(req.user.id, data, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: 'uploads/profile',
      filename: (req, file, cb) => {
        const extName = extname(file.originalname)
        const fileName = `${file.originalname}-${extName}`;
        cb(null, fileName);
      }
    })
  }))
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: UpdateProfileDto,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: 'jpeg' })
      .addMaxSizeValidator({ maxSize: 2 * 1024 *1024 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })
    ) file: Express.Multer.File
  ) {
    return this.profileService.updateProfile(id, profile, file);
  }
}
