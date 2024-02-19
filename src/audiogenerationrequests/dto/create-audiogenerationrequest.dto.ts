import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateAudioGenerationRequestDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsString()
  status: string;

  @IsDate()
  @IsNotEmpty()
  time: Date;

  @IsNumber()
  @Type(() => Number)
  creditstransactionsId: number;
}
