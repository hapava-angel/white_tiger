import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateAudioGenerationRequestDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsNumber()
  @Type(() => Number)
  creditstransactionsId: number;
}
