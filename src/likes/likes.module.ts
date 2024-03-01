import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEntity } from './entities/like.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([LikesEntity, UserEntity, TextsEntity]),
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
