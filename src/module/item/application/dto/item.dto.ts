import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductDto } from 'src/module/product/application/dto';

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
  product: ProductDto;
}
