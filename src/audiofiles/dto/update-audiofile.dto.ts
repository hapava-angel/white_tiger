import { PartialType } from '@nestjs/mapped-types';
import { CreateAudiofileDto } from './create-audiofile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAudiofileDto extends PartialType(CreateAudiofileDto) {
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
}
