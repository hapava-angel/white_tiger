import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from './entities/type.entity';
import { CreditTransactionEntity } from 'src/credittransactions/entities/credittransaction.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TypeEntity, CreditTransactionEntity]),
  ],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
