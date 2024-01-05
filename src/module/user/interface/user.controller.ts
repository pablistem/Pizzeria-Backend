import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../application/service/user.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { UserRepository } from '../infrastructure/user.repository';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {}

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user;
  }
}
