import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/module/product/domain/product.entity';

export class CreateOptionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  variant: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  product: Product;
}

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}