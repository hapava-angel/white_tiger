import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAudiofileDto } from './dto/create-audiofile.dto';
import { UpdateAudiofileDto } from './dto/update-audiofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AudiofileEntity } from './entities/audiofile.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from 'fs';

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

  async findAll(): Promise<AudiofileEntity[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<AudiofileEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateAudiofileDto,
    audio: Express.Multer.File,
  ) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (audio) {
      if (toUpdate.audio !== audio.filename) {
        fs.unlink(`db_audiofiles/${toUpdate.audio}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.audio = audio.filename;
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
