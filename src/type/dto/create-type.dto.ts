import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateTypeDto {
  @IsNumber()
  @Type(() => Number)
  transactionID: number;

  @ApiProperty({ enum: ['пополнение', 'списание'] })
  name: string;
}
