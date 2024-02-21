import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEntity } from './entities/like.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([LikesEntity])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
