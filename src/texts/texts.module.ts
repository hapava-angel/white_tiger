import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextsEntity } from './entities/text.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TextsEntity, UserEntity]),
    UserModule,
  ],
  controllers: [TextsController],
  providers: [TextsService],
})
export class TextsModule {}
