import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export enum ValidationErrorMessagesEnum {
  USERNAME_FIELD_ERROR = 'the username should not contain any special character except: "-" or "_"',
  NAME_FIELD_ERROR = 'the name should not contain any number or special character',
  LASTNAME_FIELD_ERROR = 'the last name should not contain any number or special character',
  AGE_FIELD_ERROR = 'the age should be only a number',
  PHONE_FIELD_ERROR = 'the age should be only a number',
}

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+$/, { message: ValidationErrorMessagesEnum.USERNAME_FIELD_ERROR })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/, { message: ValidationErrorMessagesEnum.NAME_FIELD_ERROR })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+$/, { message: ValidationErrorMessagesEnum.LASTNAME_FIELD_ERROR })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d+$/, { message: ValidationErrorMessagesEnum.AGE_FIELD_ERROR })
  age: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d+$/, { message: ValidationErrorMessagesEnum.PHONE_FIELD_ERROR })
  phone: string;
}
