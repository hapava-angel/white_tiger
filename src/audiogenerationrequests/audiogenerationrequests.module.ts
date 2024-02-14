import { Module } from '@nestjs/common';
import { AudiogenerationrequestsService } from './audiogenerationrequests.service';
import { AudiogenerationrequestsController } from './audiogenerationrequests.controller';

@Module({
  controllers: [AudiogenerationrequestsController],
  providers: [AudiogenerationrequestsService],
})
export class AudiogenerationrequestsModule {}
