import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  text_content: Express.Multer.File;

  @IsString()
  text_markup: string;

  @IsInt()
  @Type(() => Number)
  like_count: number;

  @IsNumber()
  @Type(() => Number)
  userId: number;
}
