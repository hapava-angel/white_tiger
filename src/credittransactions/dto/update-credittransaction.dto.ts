import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditTransactionDto } from './create-credittransaction.dto';

export class UpdateCreditTransactionDto extends PartialType(
  CreateCreditTransactionDto,
) {}
