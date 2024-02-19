import { Type } from 'class-transformer';
import {
  // IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsDate()
  @IsNotEmpty()
  time: Date;
}
