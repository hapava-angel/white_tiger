import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AudiofilesService } from './audiofiles.service';
import { CreateAudiofileDto } from './dto/create-audiofile.dto';
import { UpdateAudiofileDto } from './dto/update-audiofile.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { AudiofileEntity } from './entities/audiofile.entity';

@ApiTags('audiofiles')
@Controller('audiofiles')
export class AudiofilesController {
  constructor(private readonly audiofilesService: AudiofilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('audio', { storage: fileStorage }))
  create(
    @Body() createAudiofileDto: CreateAudiofileDto,
    @UploadedFile() audio: Express.Multer.File,
  ): Promise<AudiofileEntity> {
    return this.audiofilesService.create(createAudiofileDto, audio);
  }

  @Get()
  findAll() {
    return this.audiofilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiofilesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAudiofileDto: UpdateAudiofileDto,
  ) {
    return this.audiofilesService.update(+id, updateAudiofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiofilesService.remove(+id);
  }
}
