import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AudiogenerationrequestsService } from './audiogenerationrequests.service';
import { CreateAudiogenerationrequestDto } from './dto/create-audiogenerationrequest.dto';
import { UpdateAudiogenerationrequestDto } from './dto/update-audiogenerationrequest.dto';

@Controller('audiogenerationrequests')
export class AudiogenerationrequestsController {
  constructor(
    private readonly audiogenerationrequestsService: AudiogenerationrequestsService,
  ) {}

  @Post()
  create(
    @Body() createAudiogenerationrequestDto: CreateAudiogenerationrequestDto,
  ) {
    return this.audiogenerationrequestsService.create(
      createAudiogenerationrequestDto,
    );
  }

  @Get()
  findAll() {
    return this.audiogenerationrequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiogenerationrequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAudiogenerationrequestDto: UpdateAudiogenerationrequestDto,
  ) {
    return this.audiogenerationrequestsService.update(
      +id,
      updateAudiogenerationrequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiogenerationrequestsService.remove(+id);
  }
}
