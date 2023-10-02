import { OmitType } from '@nestjs/swagger';
import { ItemDto } from './item.dto';
export class CreateItemDto extends OmitType(ItemDto, [
  'id',
  'discount',
  'subTotal',
] as const) {}
