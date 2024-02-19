import { Module } from '@nestjs/common';
import { AudioGenerationRequestsService } from './audiogenerationrequests.service';
import { AudioGenerationRequestsController } from './audiogenerationrequests.controller';

@Module({
  controllers: [AudioGenerationRequestsController],
  providers: [AudioGenerationRequestsService],
})
export class AudiogenerationrequestsModule {}
