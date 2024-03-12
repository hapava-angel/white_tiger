import { Module } from '@nestjs/common';
import { AudioGenerationRequestsService } from './audiogenerationrequests.service';
import { AudioGenerationRequestsController } from './audiogenerationrequests.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioGenerationRequestEntity } from './entities/audiogenerationrequest.entity';
import { UserModule } from 'src/user/user.module';
import { StatusModule } from 'src/status/status.module';
import { TextsModule } from 'src/texts/texts.module';
import { UserEntity } from 'src/user/entities/user.entity';
import { StatusEntity } from 'src/status/entities/status.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      AudioGenerationRequestEntity,
      UserEntity,
      StatusEntity,
      TextsEntity,
    ]),
    UserModule,
    StatusModule,
    TextsModule,
  ],
  controllers: [AudioGenerationRequestsController],
  providers: [AudioGenerationRequestsService],
})
export class AudiogenerationrequestsModule {}
