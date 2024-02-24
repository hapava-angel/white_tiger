import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateCreditTransactionDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsString()
  ammount: GLfloat;

  @IsDate()
  @IsNotEmpty()
  time: Date;

  // @IsNumber()
  // @Type(() => Number)
  // creditstransactioaudiogenerationrequestId: number;
}
