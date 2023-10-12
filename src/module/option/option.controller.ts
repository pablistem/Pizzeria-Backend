import { OptionService } from './service/option.service';
import { CreateOptionDto, UpdateOptionDto } from './dto/option.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
  async create(@Body() data: CreateOptionDto) {
    return await this.optionService.create(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('update/:id')
  async updateOption(
    @Body() changes: UpdateOptionDto,
    @Param('id', ParseIntPipe) optionId: number,
  ) {
    return await this.optionService.updateOption(changes, optionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('remove/:id')
  async removeOption(@Param('id', ParseIntPipe) optionId: number) {
    return await this.optionService.removeOption(optionId);
  }
}