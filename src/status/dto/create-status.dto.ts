import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({ enum: ['ожидание', 'завершено', 'отмена'] })
  name: string;
}
