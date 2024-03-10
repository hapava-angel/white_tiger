import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentsEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private commentsRepository: Repository<CommentsEntity>,

    @InjectRepository(TextsEntity)
    private textRepository: Repository<TextsEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateCommentDto): Promise<CommentsEntity> {
    const comment = new CommentsEntity();
    comment.comment_text = dto.comment_text;

    const newComment = await this.commentsRepository.save(comment);

    const text = await this.textRepository.findOne({
      where: { id: dto.textId },
      relations: ['comments'],
    });

    if (!text) {
      throw new NotFoundException('Text not found');
    }

    text.comments.push(newComment);
    text.comment_count++;
    await this.textRepository.save(text);

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['comments'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.comments.push(newComment);
    await this.userRepository.save(user);

    return newComment;
  }

  async findAll(): Promise<CommentsEntity[]> {
    return this.commentsRepository.find();
  }

  findOne(id: number): Promise<CommentsEntity> {
    return this.commentsRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCommentDto): Promise<CommentsEntity> {
    const toUpdate = await this.commentsRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.comment_text) {
      toUpdate.comment_text = dto.comment_text;
    }

    return this.commentsRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.commentsRepository.delete(id);
  }
}
