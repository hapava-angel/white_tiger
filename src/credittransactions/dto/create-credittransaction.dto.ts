import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsTime,
    IsNumber,
  } from 'class-validator';

export class AudioGenerationRequestDto {

  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsString()
  type: string; //может не строка, а array если есть ограниченное кол-во значений(маркеров) "пополнение", "списание"

  @IsString()
  ammount: GLfloat;

  @IsTime()
  @IsNotEmpty()
  time: Date;

  // @IsNumber()
  // @Type(() => Number)
  // creditstransactioaudiogenerationrequestId: number;

}
