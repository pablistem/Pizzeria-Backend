import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly variant: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly product: undefined;
}

export class UpdateOptionDto extends PartialType(CreateOptionDto) {}
