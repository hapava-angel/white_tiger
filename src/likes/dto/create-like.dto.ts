import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  // IsString,
  // IsNotEmpty,
  // IsDate,
  IsNumber,
} from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @ApiProperty({ enum: ['yes'] })
  @IsIn(['yes'])
  like: string;

  @IsNumber()
  @Type(() => Number)
  textId: number;
}
