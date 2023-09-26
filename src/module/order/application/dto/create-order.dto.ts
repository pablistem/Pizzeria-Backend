import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderDto } from './order.dto';
import { IsNotEmpty } from 'class-validator';
import { CreateItemDto } from 'src/module/item/application/dto/create-item.dto';

export class CreateOrderDto extends OmitType(OrderDto, [
  'id',
  'total',
  'status',
] as const) {
  @ApiProperty()
  @IsNotEmpty()
  items: CreateItemDto[];
}
