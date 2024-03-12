import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TextsEntity } from './entities/text.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as fs from 'fs';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(TextsEntity)
    private textRepository: Repository<TextsEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(
    dto: CreateTextDto,
    text_content: Express.Multer.File,
  ): Promise<TextsEntity> {
    const text = new TextsEntity();
    text.text_content = text_content.filename;
    text.text_markup = dto.text_markup;
    text.like_count = dto.like_count;

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['texts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newText = await this.textRepository.save(text);

    user.texts.push(text);

    await this.userRepository.save(user);

    return newText;
  }

  async findAll(): Promise<TextsEntity[]> {
    return this.textRepository.find();
  }

  async findOne(id: number): Promise<TextsEntity> {
    return this.textRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateTextDto,
    text_content: Express.Multer.File,
  ) {
    const toUpdate = await this.textRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (text_content) {
      if (toUpdate.text_content !== text_content.filename) {
        fs.unlink(`db_texts/${toUpdate.text_content}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.text_content = text_content.filename;
    }
    if (dto.text_markup) {
      toUpdate.text_markup = dto.text_markup;
    }
    return this.textRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.textRepository.delete(id);
  }
}
