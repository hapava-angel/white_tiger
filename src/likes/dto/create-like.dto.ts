import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;
}
