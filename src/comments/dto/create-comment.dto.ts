// import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment_text: string;

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  // @IsDate()
  // @IsNotEmpty()
  // time: Date;
}
