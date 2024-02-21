import { Module } from '@nestjs/common';
import { AudioGenerationRequestsService } from './audiogenerationrequests.service';
import { AudioGenerationRequestsController } from './audiogenerationrequests.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioGenerationRequestEntity } from './entities/audiogenerationrequest.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AudioGenerationRequestEntity]),
  ],
  controllers: [AudioGenerationRequestsController],
  providers: [AudioGenerationRequestsService],
})
export class AudiogenerationrequestsModule {}
