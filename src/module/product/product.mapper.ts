import { Injectable } from '@nestjs/common';

import { Product } from './domain/product.entity';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from './application/dto';

@Injectable()
export class ProductMapper {
  fromEntityToDto(product: Product): ProductDto {
    const dto = new ProductDto();

    dto.id = product.id;
    dto.title = product.title;
    dto.description = product.description;
    dto.image = product.image;
    dto.price = product.price;
    dto.stock = product.stock;
    dto.category = product.category;

    return dto;
  }

  fromDtoToEntity(dto: UpdateProductDto | CreateProductDto): Product {
    const product = new Product();
    if ('id' in dto) {
      product.id = dto.id;
    }
    product.title = dto.title;
    product.description = dto.description;
    product.image = dto.image;
    product.price = dto.price;
    product.stock = dto.stock;
    product.category = dto.category;
    return product;
  }
}
