import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../application/service/user.service';

import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../common/guards/jwt.guard';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe() {
    return '';
  }
  // //   @Post()
  //   create(@Body() createUserDto: CreateUserDto) {
  //     return this.userService.create(createUserDto);
  //   }

  //   @Get()
  //   findAll() {
  //     return this.userService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.userService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.userService.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.userService.remove(+id);
  //   }
}
