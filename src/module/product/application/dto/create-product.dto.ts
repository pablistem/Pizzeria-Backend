import { OmitType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, ['id'] as const) {}
