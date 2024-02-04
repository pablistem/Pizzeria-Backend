import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AddAddressDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string
}