import { Injectable } from '@nestjs/common';
import { CreateAudiofileDto } from './dto/create-audiofile.dto';
import { UpdateAudiofileDto } from './dto/update-audiofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AudiofileEntity } from './entities/audiofile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AudiofilesService {
  constructor(
    @InjectRepository(AudiofileEntity)
    private repository: Repository<AudiofileEntity>,
  ) {}

  async create(
    dto: CreateAudiofileDto,
    audio: Express.Multer.File,
  ): Promise<AudiofileEntity> {
    return await this.repository.save({
      audio: audio.filename,
    });
  }

  findAll() {
    return `This action returns all audiofiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audiofile`;
  }

  update(id: number, updateAudiofileDto: UpdateAudiofileDto) {
    return `This action updates a #${id} audiofile`;
  }

  remove(id: number) {
    return `This action removes a #${id} audiofile`;
  }
}
