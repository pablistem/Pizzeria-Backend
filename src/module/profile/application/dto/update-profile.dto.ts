import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  age?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone?: string;
}
