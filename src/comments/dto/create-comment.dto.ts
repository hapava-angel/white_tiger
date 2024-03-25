import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment_text: string;

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;
}
