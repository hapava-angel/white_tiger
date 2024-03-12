import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsInt } from 'class-validator';

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

  @ApiHideProperty()
  @IsInt()
  @Type(() => Number)
  like_count: number = 0;

  @ApiHideProperty()
  @IsInt()
  @Type(() => Number)
  comment_count: number = 0;

  @IsNumber()
  @Type(() => Number)
  userId: number;
}
