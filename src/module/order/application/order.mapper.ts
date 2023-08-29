import { Injectable } from '@nestjs/common';
import { Order } from '../domain/order.entity';
import { OrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderMapper {
  fromEntityToDto(order: Order): OrderDto {
    const dto = new OrderDto();
    dto.id = order.id;
    dto.status = order.status;
    dto.total = order.total;
    return dto;
  }

  fromDtoToEntity(dto: UpdateOrderDto | CreateOrderDto): Order {
    const order = new Order();
    if ('id' in dto) {
      order.id = dto.id;
    }
    order.status = dto.status;
    order.total = dto.total;

    return order;
  }
}
