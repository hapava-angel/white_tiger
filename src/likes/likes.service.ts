import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikesEntity } from './entities/like.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesEntity)
    private likesRepository: Repository<LikesEntity>,

    @InjectRepository(TextsEntity)
    private textRepository: Repository<TextsEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(dto: CreateLikeDto): Promise<LikesEntity> {
    const likes = new LikesEntity();

    const newLike = await this.likesRepository.save(likes);

    const text = await this.textRepository.findOne({
      where: { id: dto.textId },
      relations: ['likes'],
    });

    if (!text) {
      throw new NotFoundException('Text not found');
    }

    text.likes.push(newLike);
    text.like_count++;
    await this.textRepository.save(text);

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['likes'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.likes.push(newLike);
    await this.userRepository.save(user);

    return newLike;
  }
  async findAll(): Promise<LikesEntity[]> {
    return this.likesRepository.find();
  }

  findOne(id: number): Promise<LikesEntity> {
    return this.likesRepository.findOneBy({ id });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.likesRepository.delete(id);
  }
}
