import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ enum: ['ожидание', 'завершено', 'отмена'] })
  name: string;
}
