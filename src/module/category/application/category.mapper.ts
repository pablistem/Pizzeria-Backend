import { Injectable } from '@nestjs/common';
import { Category } from './domain/category.entity';
import { UpdateCategoryDto, CreateCategoryDto, CategoryDto } from './dto';

@Injectable()
export class CategoryMapper {
  fromEntityToDto(item: CategoryDto): CategoryDto {
    const dto = new CategoryDto();
    Object.keys(dto).forEach((key) => {
      dto[key] = item[key];
    });
    return dto;
  }

  fromDtoToEntity(
    dto: UpdateCategoryDto | CreateCategoryDto | CategoryDto,
  ): Category {
    const category = new Category();
    Object.keys(dto).forEach((key) => {
      category[key] = dto[key];
    });
    return category;
  }
}
