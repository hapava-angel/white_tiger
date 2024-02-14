import { Module } from '@nestjs/common';
import { CredittransactionsService } from './credittransactions.service';
import { CredittransactionsController } from './credittransactions.controller';

@Module({
  controllers: [CredittransactionsController],
  providers: [CredittransactionsService],
})
export class CredittransactionsModule {}
