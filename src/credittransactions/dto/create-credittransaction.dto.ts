import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateCreditTransactionDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  @Type(() => Number)
  typeId: number;

  @IsNumber()
  @Type(() => Number)
  ammount: number = 0;
}
