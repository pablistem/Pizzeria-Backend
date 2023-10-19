import { OmitType } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';

export class createCategoryDto extends OmitType(CategoryDto, ['id'] as const) {}
