import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../application/service/user.service';

import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { UserRepository } from '../infrastructure/user.repository';
import { ENVIRONMENTS } from '../../../../ormconfig';
import { ConfigService } from '@nestjs/config';

@ApiTags('User')
// @UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly config: ConfigService
  ) {}
// @UseGuards(JwtGuard)
  @Get('me')
  async getMe() {
    return 'ok';
  }

  @Get('reset')
  async loadTestDb() {
    if (this.config.get('NODE_ENV') === ENVIRONMENTS.AUTOMATED_TEST) {
      await this.userRepository.loadTestData().then(()=>console.log('Data is deployment'));
    }
    return 'ok'
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
