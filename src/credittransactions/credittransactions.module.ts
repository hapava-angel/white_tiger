import { Module } from '@nestjs/common';
import { CreditTransactionsService } from './credittransactions.service';
import { CreditTransactionsController } from './credittransactions.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditTransactionEntity } from './entities/credittransaction.entity';
import { TypeModule } from 'src/type/type.module';
import { UserModule } from 'src/user/user.module';
import { TypeEntity } from 'src/type/entities/type.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CreditTransactionEntity, TypeEntity, UserEntity]),
    TypeModule,
    UserModule,
  ],
  controllers: [CreditTransactionsController],
  providers: [CreditTransactionsService],
})
export class CreditTransactionsModule {}
