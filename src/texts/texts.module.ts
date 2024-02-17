import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextsEntity } from './entities/text.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TextsEntity])], //внутри @Module
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
