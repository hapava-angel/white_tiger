import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'name1' })
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @ApiProperty({ default: '123' })
  password: string;

  @IsNumber()
  @Type(() => Number)
  credits: number;

  @IsNumber()
  @Type(() => Number)
  roleId: number = 1;
}
