import { Module } from '@nestjs/common';
import { CreditTransactionsService } from './credittransactions.service';
import { CreditTransactionsController } from './credittransactions.controller';

@Module({
  controllers: [CreditTransactionsController],
  providers: [CreditTransactionsService],
})
export class CreditTransactionsModule {}
