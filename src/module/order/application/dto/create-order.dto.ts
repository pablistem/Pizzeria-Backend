import { OmitType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class CreateOrderDto extends OmitType(OrderDto, ['id'] as const) {}
