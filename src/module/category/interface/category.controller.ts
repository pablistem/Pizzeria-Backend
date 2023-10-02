import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../application/service/category.service';
import { JwtGuard } from './../../../../src/common/guards/jwt.guard';
import { Category } from '../application/domain/category.entity';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategory) {
    return await this.categoryService.create(createCategory);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.delete(id);
  }

  @Put('id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryUpdate,
  ): Promise<Category> {
    return await this.categoryService.update(id, categoryUpdate);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.categoryService.getOne(id);
  }
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }
}
