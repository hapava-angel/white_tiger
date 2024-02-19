// import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsTime,
    IsNumber,
  } from 'class-validator';

export class CreateCommentsDto {
  @IsString()
  comment_text: string;

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsTime()
  @IsNotEmpty()
  time: Date;

}
