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
import { CreateCategoryDto, UpdateCategoryDto } from '../application/dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'create a new category' })
  @ApiBody({ 
    type: CreateCategoryDto,
    description: 'all the fields should be filled out' 
  })
  async create(
    @Body() createCategory: CreateCategoryDto,
    @Req() req: UserRequest,
  ): Promise<Category> {
    const newCategory = this.categoryMapper.fromDtoToEntity(createCategory);
    return await this.categoryService.create(newCategory, req.user.id);
  }

  @ApiOperation({ summary: 'delete a category' })
  @ApiParam({
    name: 'id', 
    type: 'number', 
    example: 1, 
    description: 'the category unique id' 
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: UserRequest) {
    return await this.categoryService.delete(id, req.user.id);
  }

  @ApiOperation({ summary: 'update a category' })
  @ApiParam({
    name: 'id', 
    type: 'number', 
    example: 1, 
    description: 'the category unique id' 
  })
  @ApiBody({ 
    type: UpdateCategoryDto,
    description: 'all the fields are optionals' 
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryUpdate: UpdateCategoryDto,
    @Req() req: UserRequest,
  ): Promise<Category> {
    const updateCategory = this.categoryMapper.fromDtoToEntity(categoryUpdate);
    return await this.categoryService.update(id, updateCategory, req.user.id);
  }

  @ApiOperation({ summary: 'get a category by id' })
  @ApiParam({
    name: 'id', 
    type: 'number', 
    example: 1, 
    description: 'the category unique id' 
  })
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: UserRequest,
  ): Promise<Category> {
    return await this.categoryService.getOne(id, req.user.id);
  }

  @ApiOperation({ summary: 'set an array of categories' })
  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }
}
