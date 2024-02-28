import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeEntity } from './entities/type.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TypeEntity])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
