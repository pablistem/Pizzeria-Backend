import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

import { AuthService } from '../application/service/auth.service';
import { LoginDto, CreateAuthDto } from '../application/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.signUp(createAuthDto);
    return HttpStatus.CREATED;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const loginUser = await this.authService.login(loginDto);
    return loginUser;
  }

  @Post('logout')
  async logout(@Body() id:number){
    this.authService.logOut(id)
    return HttpStatus.ACCEPTED
  }
}
