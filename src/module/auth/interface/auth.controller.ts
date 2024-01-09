import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '../application/service/auth.service';
import { LoginDto, CreateAuthDto } from '../application/dto';
import { JwtGuard } from '../../../../src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signUp(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.authService.login(res, loginDto);
    res.json(response);
    res.send();
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(@Req() req: UserRequest, @Res() res: Response) {
    return await this.authService.logOut(req.user.id, res);
  }

  @Get('session')
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    const cookie = req.headers.cookie;
    if (cookie === undefined) {
      throw new HttpException('Access denied', 403);
    }
    const httpOnlyToken: string = cookie?.split('=')[1];

    const newSession = await this.authService.refreshToken(httpOnlyToken, res);

    res.setHeader('Content-Type', 'application/json');
    res.json({ accessToken: newSession });
  }
}
