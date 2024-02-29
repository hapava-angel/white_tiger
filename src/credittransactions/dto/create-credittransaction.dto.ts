import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateCreditTransactionDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNumber()
  ammount: GLfloat;

  // @IsNumber()
  // @Type(() => Number)
  // audiogenerationrequestId: number;
}
