import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  address: string
}