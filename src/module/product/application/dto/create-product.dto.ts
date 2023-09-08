import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsString()
  image: string;

  constructor(
    name: string,
    description: string,
    category: string,
    price: number,
    image?: string,
    stock?: number,
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price;
    this.stock = stock;
  }
}
