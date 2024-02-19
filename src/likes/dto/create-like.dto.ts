import { Type } from 'class-transformer';
import {
    // IsString,
    IsNotEmpty,
    IsTime,
    IsNumber,
  } from 'class-validator';

export class CreateLikeDto {

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()s
  @Type(() => Number)
  textId: number;

  @IsTime()
  @IsNotEmpty()
  time: Date;

}
