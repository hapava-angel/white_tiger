import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusEntity } from './entities/status.entity';
import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StatusEntity)
    private statusRepository: Repository<StatusEntity>,

    @InjectRepository(AudioGenerationRequestEntity)
    private generationRepository: Repository<AudioGenerationRequestEntity>,
  ) {}

  async create(dto: CreateStatusDto): Promise<StatusEntity> {
    const status = new StatusEntity();
    status.name = dto.name;
    const newStatus = await this.statusRepository.save(status);
    return newStatus;
  }

  // async findAll(): Promise<StatusEntity[]> {
  //   return this.statusRepository.find();
  // }

  // findOne(id: number): Promise<StatusEntity> {
  //   return this.statusRepository.findOneBy({ id });
  // }

  async update(id: number, dto: UpdateStatusDto): Promise<StatusEntity> {
    const toUpdate = await this.statusRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }

    return this.statusRepository.save(toUpdate);
  }

  // async delete(id: number): Promise<DeleteResult> {
  //   return this.statusRepository.delete(id);
  // }
}
