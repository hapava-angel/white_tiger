import { Module } from '@nestjs/common';
import { AudiofilesService } from './audiofiles.service';
import { AudiofilesController } from './audiofiles.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudiofileEntity } from './entities/audiofile.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AudiofileEntity])],
  controllers: [AudiofilesController],
  providers: [AudiofilesService],
})
export class AudiofilesModule {}
