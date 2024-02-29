import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAudiofileDto } from './dto/create-audiofile.dto';
import { UpdateAudiofileDto } from './dto/update-audiofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AudiofileEntity } from './entities/audiofile.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from 'fs';
import { TextsEntity } from 'src/texts/entities/text.entity';

@Injectable()
export class AudiofilesService {
  constructor(
    @InjectRepository(AudiofileEntity)
    private audioRepository: Repository<AudiofileEntity>,

    @InjectRepository(TextsEntity)
    private textRepository: Repository<TextsEntity>,
  ) {}

  async create(
    dto: CreateAudiofileDto,
    audio: Express.Multer.File,
  ): Promise<AudiofileEntity> {
    const audiofile = new AudiofileEntity();
    audiofile.audio = audio.filename;

    const newAudiofile = await this.audioRepository.save(audiofile);

    const text = await this.textRepository.findOne({
      where: { id: dto.textId },
      relations: ['audio'],
    });

    if (!text) {
      throw new NotFoundException('Text not found');
    }

    text.audio.push(audiofile);

    await this.textRepository.save(text);

    return newAudiofile;
  }

  async findAll(): Promise<AudiofileEntity[]> {
    return this.audioRepository.find();
  }

  async findOne(id: number): Promise<AudiofileEntity> {
    return this.audioRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateAudiofileDto,
    audio: Express.Multer.File,
  ) {
    const toUpdate = await this.audioRepository.findOneBy({ id });
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
    return this.audioRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.audioRepository.delete(id);
  }
}
