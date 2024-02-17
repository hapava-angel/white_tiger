import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsNumberString,
} from 'class-validator';

export class CreateTextDto {
  @IsString()
  text_content: string;

  @IsString()
  text_markup: string;

  @ApiHideProperty()
  @IsNumberString()
  like_count: number;

  @IsNumberString()
  userId: number;
}
