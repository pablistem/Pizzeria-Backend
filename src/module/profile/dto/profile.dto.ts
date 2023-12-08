import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from 'src/module/user/domain/user.entity';

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
  @IsNumber()
  userId: User;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
