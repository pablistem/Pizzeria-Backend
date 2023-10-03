import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../application/service/category.service';
import { JwtGuard } from './../../../../src/common/guards/jwt.guard';
import { Category } from '../application/domain/category.entity';
import { CategoryMapper } from '../application/category.mapper';
import { UserRequest } from '../../../../src/common/interfaces/UserRequest';
import { UpdateCategoryDto, createCategoryDto } from '../application/dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  @Post('create')
  async create(
    @Body() createCategory: createCategoryDto,
    @Req() req: UserRequest,
  ): Promise<Category> {
    const newCategory = this.categoryMapper.fromDtoToEntity(createCategory);
    return await this.categoryService.create(newCategory, req.user.id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: UserRequest) {
    return await this.categoryService.delete(id, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryUpdate: UpdateCategoryDto,
    @Req() req: UserRequest,
  ): Promise<Category> {
    const updateCategory = this.categoryMapper.fromDtoToEntity(categoryUpdate);
    return await this.categoryService.update(id, updateCategory, req.user.id);
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: UserRequest,
  ): Promise<Category> {
    return await this.categoryService.getOne(id, req.user.id);
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }
}
