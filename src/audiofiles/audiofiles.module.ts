import { Module } from '@nestjs/common';
import { AudiofilesService } from './audiofiles.service';
import { AudiofilesController } from './audiofiles.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudiofileEntity } from './entities/audiofile.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { TextsModule } from 'src/texts/texts.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AudiofileEntity, TextsEntity]),
    TextsModule,
  ],
  controllers: [AudiofilesController],
  providers: [AudiofilesService],
})
export class AudiofilesModule {}
