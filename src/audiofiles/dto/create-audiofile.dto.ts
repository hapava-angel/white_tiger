import { Type } from 'class-transformer';
import { IsString, IsNumberString, IsNumber } from 'class-validator';

export class CreateAudiofileDto {
  @IsString()
  filepath: string;

  @IsNumber()
  @Type(() => Number)
  textId: number;
}
