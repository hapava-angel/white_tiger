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
  UseGuards,
  Res,
  NotFoundException,
  HttpCode,
  StreamableFile,
  BadRequestException,
  Header,
} from '@nestjs/common';
import { AudiofilesService } from './audiofiles.service';
import { CreateAudiofileDto } from './dto/create-audiofile.dto';
import { UpdateAudiofileDto } from './dto/update-audiofile.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { AudiofileEntity } from './entities/audiofile.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { GoogleOAuthGuard } from 'src/auth/guards/google.guard';
import { ComplexGuard } from 'src/auth/guards/complex.guard';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@ApiBearerAuth()
@UseGuards(ComplexGuard, RolesGuard)
@ApiTags('audiofiles')
@Controller('audiofiles')
export class AudiofilesController {
  constructor(private readonly audiofilesService: AudiofilesService) {}

  @Post()
  create(
    @Body() createAudiofileDto: CreateAudiofileDto,
  ): Promise<AudiofileEntity> {
    return this.audiofilesService.create(createAudiofileDto);
  }



  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  findAll() {
    return this.audiofilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiofilesService.findOne(+id);
  }

  @Get('download/:id')
  @Header('Content-Type', 'audio/wav')
  @Header('Content-Disposition', 'attachment; filename="audiofile.wav"')
  async getAudio(@Param('id') id: number) {
    const filePath = await this.audiofilesService.getAudioPath(id); 
    if (!filePath) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    const readStream = createReadStream(filePath); 
    return new StreamableFile(readStream); 
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('audio', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() updateAudiofileDto: UpdateAudiofileDto,
    @UploadedFile() audio: Express.Multer.File,
  ): Promise<AudiofileEntity> {
    return this.audiofilesService.update(+id, updateAudiofileDto, audio);
  }

  @Delete('delite/:id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.audiofilesService.delete(+id);
  }
}
