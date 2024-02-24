import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateAudioGenerationRequestDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsDate()
  @IsNotEmpty()
  time: Date;

  @IsNumber()
  @Type(() => Number)
  creditstransactionsId: number;
}
