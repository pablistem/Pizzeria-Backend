import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ItemDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  subTotal: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product: number;
}
