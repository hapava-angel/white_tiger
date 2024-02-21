import { Module } from '@nestjs/common';
import { CreditTransactionsService } from './credittransactions.service';
import { CreditTransactionsController } from './credittransactions.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditTransactionEntity } from './entities/credittransaction.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([CreditTransactionEntity])],
  controllers: [CreditTransactionsController],
  providers: [CreditTransactionsService],
})
export class CreditTransactionsModule {}
