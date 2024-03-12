import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAudioGenerationRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  textId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  statusId: number;

  @ApiHideProperty()
  @IsNumber()
  @Type(() => Number)
  cost: number = 50;
}
