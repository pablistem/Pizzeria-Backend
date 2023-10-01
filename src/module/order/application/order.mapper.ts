import { Injectable } from '@nestjs/common';
import { Order } from '../domain/order.entity';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderMapper {
  fromEntityToDto(item: OrderDto): OrderDto {
    const dto = new OrderDto();
    Object.keys(dto).forEach((key) => {
      dto[key] = item[key];
    });
    return dto;
  }

  fromDtoToEntity(dto: UpdateOrderDto | CreateOrderDto | OrderDto): Order {
    const order = new Order();
    Object.keys(dto).forEach((key) => {
      order[key] = dto[key];
    });
    return order;
  }
}
