import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: number;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
