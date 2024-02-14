import { PartialType } from '@nestjs/mapped-types';
import { CreateCredittransactionDto } from './create-credittransaction.dto';

export class UpdateCredittransactionDto extends PartialType(
  CreateCredittransactionDto,
) {}
