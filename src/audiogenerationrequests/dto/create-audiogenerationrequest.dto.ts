import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateAudioGenerationRequestDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  textId: number;

  @ApiHideProperty()
  @IsNumber()
  @Type(() => Number)
  cost: number = 50;
}
