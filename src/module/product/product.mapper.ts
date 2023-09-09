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
        dto. = product.id;
        dto.id = product.id;
        dto.id = product.id;
        dto.id = product.id;
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
    product.options = dto.options;
    return product;
  }
}

// import { Injectable } from '@nestjs/common';
// import { Order } from '../domain/order.entity';
// import { OrderDto } from './dto/order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { CreateOrderDto } from './dto/create-order.dto';

// @Injectable()
// export class OrderMapper {
//   fromEntityToDto(order: Order): OrderDto {
//     const dto = new OrderDto();
//     dto.id = order.id;
//     dto.status = order.status;
//     dto.total = order.total;
//     return dto;
//   }

//   fromDtoToEntity(dto: UpdateOrderDto | CreateOrderDto): Order {
//     const order = new Order();
//     if ('id' in dto) {
//       order.id = dto.id;
//     }
//     order.status = dto.status;
//     order.total = dto.total;

//     return order;
//   }
// }
