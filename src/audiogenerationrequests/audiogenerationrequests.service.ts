import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAudioGenerationRequestDto } from './dto/create-audiogenerationrequest.dto';
import { UpdateAudiogenerationRequestDto } from './dto/update-audiogenerationrequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AudioGenerationRequestEntity } from './entities/audiogenerationrequest.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { StatusEntity } from 'src/status/entities/status.entity';
import { InsufficientCreditsException } from 'src/custom-exeptions';

@Injectable()
export class AudioGenerationRequestsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(AudioGenerationRequestEntity)
    private generationRepository: Repository<AudioGenerationRequestEntity>,

    @InjectRepository(TextsEntity)
    private textsRepository: Repository<TextsEntity>,

    @InjectRepository(StatusEntity)
    private statusRepository: Repository<StatusEntity>,
  ) {}

  async create(dto: CreateAudioGenerationRequestDto) {
    const generation = new AudioGenerationRequestEntity();
    generation.cost = dto.cost;

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['generation'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      if (user.credits < generation.cost) {
        throw new InsufficientCreditsException('Not enough credits');
      } else {
        user.credits -= generation.cost;
      }
    }

    const text = await this.textsRepository.findOne({
      where: { id: dto.textId },
      relations: ['generation'],
    });

    if (!text) {
      throw new NotFoundException('Text not found');
    }

    const status = await this.statusRepository.findOne({
      where: { id: dto.statusId },
      relations: ['generation_status'],
    });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const newGeneration = await this.generationRepository.save(generation);

    status.generation_status.push(generation);
    await this.statusRepository.save(status);

    text.generation.push(generation);
    await this.textsRepository.save(text);

    user.generation.push(generation);
    await this.userRepository.save(user);

    return newGeneration;
  }

  async findAll(): Promise<AudioGenerationRequestEntity[]> {
    return this.generationRepository.find();
  }

  async findOne(id: number): Promise<AudioGenerationRequestEntity> {
    return this.generationRepository.findOneBy({ id });
  }

  update(
    id: number, dto: UpdateAudiogenerationRequestDto) {
    return `This action updates a #${id} audiogenerationrequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} audiogenerationrequest`;
  }
}
