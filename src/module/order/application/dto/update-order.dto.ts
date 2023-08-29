import { PartialType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class UpdateOrderDto extends PartialType(OrderDto) {}
