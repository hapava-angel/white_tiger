import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './entities/comment.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([CommentsEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
