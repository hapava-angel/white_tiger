import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumberString, IsNumber } from 'class-validator';

export class CreateAudiofileDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  audio: Express.Multer.File;

  @IsNumber()
  @Type(() => Number)
  textId: number;
}
