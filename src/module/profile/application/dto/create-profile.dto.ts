import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, IsOptional } from 'class-validator';
import { ValidationErrorMessagesEnum, EmptyFieldErrorMessagesEnum } from './validation-error-messages';

export class CreateProfileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  avatar?: Express.Multer.File

  @ApiProperty()
  @IsNotEmpty({ message: EmptyFieldErrorMessagesEnum.USERNAME_EMPTY_ERROR })
  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+$/, { message: ValidationErrorMessagesEnum.USERNAME_INVALID_ERROR })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: EmptyFieldErrorMessagesEnum.NAME_EMPTY_ERROR })
  @IsString()
  @Matches(/^[a-zA-Z]+$/, { message: ValidationErrorMessagesEnum.NAME_INVALID_ERROR })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: EmptyFieldErrorMessagesEnum.LASTNAME_EMPTY_ERROR })
  @IsString()
  @Matches(/^[a-zA-Z]+$/, { message: ValidationErrorMessagesEnum.LASTNAME_INVALID_ERROR })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: EmptyFieldErrorMessagesEnum.AGE_EMPTY_ERROR })
  @IsString()
  @Matches(/^\d+$/, { message: ValidationErrorMessagesEnum.AGE_INVALID_ERROR })
  age: string;

  @ApiProperty()
  @IsNotEmpty({ message: EmptyFieldErrorMessagesEnum.PHONE_EMPTY_ERROR })
  @IsString()
  @Matches(/^\d+$/, { message: ValidationErrorMessagesEnum.PHONE_INVALID_ERROR })
  phone: string;
}
