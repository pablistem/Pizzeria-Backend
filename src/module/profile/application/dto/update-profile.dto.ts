import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  postalCode?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age?: number;
}
