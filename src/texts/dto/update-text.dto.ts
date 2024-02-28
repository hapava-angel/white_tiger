import { PartialType } from '@nestjs/mapped-types';
import { CreateTextDto } from './create-text.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTextDto extends PartialType(CreateTextDto) {
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
}
