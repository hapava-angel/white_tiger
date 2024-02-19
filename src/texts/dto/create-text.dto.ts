// import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumberString,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreateTextDto {
  @IsString()
  text_content: string;

  @IsString()
  text_markup: string;

  @IsInt()
  @Type(() => Number)
  like_count: number;

  @IsNumber()
  @Type(() => Number)
  userId: number;
}
