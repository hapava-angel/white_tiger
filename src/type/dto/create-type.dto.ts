import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @ApiProperty({ enum: ['пополнение', 'списание'] })
  name: string;
}
