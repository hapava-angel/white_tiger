import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { StatusEntity } from './entities/status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([StatusEntity, AudioGenerationRequestEntity]),
  ],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
