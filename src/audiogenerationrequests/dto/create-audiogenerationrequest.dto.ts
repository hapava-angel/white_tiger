import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsTime,
    IsNumber,
  } from 'class-validator';

export class CreateAudioGenerationRequestDto {

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsString()
  status: string;

  @IsTime()
  @IsNotEmpty()
  time: Date;

  @IsNumber()
  @Type(() => Number)
  creditstransactionsId: number;

}
