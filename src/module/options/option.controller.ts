import { OptionService } from './service/option.service';
//import create option dto
//import update option dto
import { Option } from './domain/option.entity';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserRequest } from 'src/common/interfaces/UserRequest';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@ApiTags('Options')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Get()
  async getAllOptions() {
    return await this.optionService.getAllOptions();
  }

  @Get(':id')
  async getOneOption(@Param('id', ParseIntPipe) optionId: number) {
    return await this.optionService.getOne(optionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('create')
  //   aply create option dto and type of return
  async create(@Body() createOptionDto: any) {
    return await this.optionService.create(createOptionDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update/:id')
  async updateOption(
    // aply update option dto and type of return
    @Body() updateOptionDto: any,
    @Param('id', ParseIntPipe) optionId: number,
  ) {
    updateOptionDto.id = optionId;
    return await this.optionService.updateOption(updateOptionDto, optionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('delete/:id')
  async remove(
    @Param('id', ParseIntPipe) optionId: number,
    @Req() req: UserRequest,
  ) {
    return await this.optionService.remove(req.user.id, optionId);
  }
}
