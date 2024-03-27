import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  postalCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  profile: number;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}