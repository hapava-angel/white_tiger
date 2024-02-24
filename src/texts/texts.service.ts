import { Injectable } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TextsEntity } from './entities/text.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TextsService {
  constructor(
    @InjectRepository(TextsEntity)
    private repository: Repository<TextsEntity>,
  ) {}

  async create(
    dto: CreateTextDto,
    text_content: Express.Multer.File,
  ): Promise<TextsEntity> {
    return await this.repository.save({
      text_content: text_content.filename,
      text_markup: dto.text_markup,
      like_count: dto.like_count,
    });
  }

  findAll() {
    return `This action returns all texts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} text`;
  }

  update(id: number, updateTextDto: UpdateTextDto) {
    return `This action updates a #${id} text`;
  }

  remove(id: number) {
    return `This action removes a #${id} text`;
  }
}
