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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'register a new user' })
  @ApiBody({
    type: CreateAuthDto,
    description: 'all the fields should be filled out'
  })
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signUp(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login to get an access and refresh token' })
  @ApiBody({
    type: CreateAuthDto,
    description: 'all the fields should be filled out'
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.authService.login(res, loginDto);
    res.json(response);
    res.send();
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  @ApiOperation({ summary: 'logout to erase the refresh token' })
  async logout(
    @Req() req: Request,
    @Req() userRequest: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const cookie = req.headers.cookie;
    return await this.authService.logOut(cookie, userRequest, res);
  }

  @Get('session')
  @ApiOperation({ summary: 'refresh to get a new access token' })
  async refreshSession(@Req() req: Request, @Res() res: Response) {
    const cookie = req.headers.cookie;
    if (cookie === undefined) {
      throw new HttpException('Access denied', 403);
    }
    const httpOnlyToken: string = cookie?.split('=')[1].split(';')[0]

    const newSession = await this.authService.refreshToken(httpOnlyToken, res);

    res.setHeader('Content-Type', 'application/json');
    res.json({ accessToken: newSession });
  }
}
