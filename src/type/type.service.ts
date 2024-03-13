import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeEntity } from './entities/type.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreditTransactionEntity } from 'src/credittransactions/entities/credittransaction.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypeEntity)
    private typeRepository: Repository<TypeEntity>,
  ) {}

  async create(dto: CreateTypeDto): Promise<TypeEntity> {
    const status = new TypeEntity();
    status.name = dto.name;
    const newStatus = await this.typeRepository.save(status);
    return newStatus;
  }

  async findAll(): Promise<TypeEntity[]> {
    return this.typeRepository.find();
  }

  findOne(id: number): Promise<TypeEntity> {
    return this.typeRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateTypeDto): Promise<TypeEntity> {
    const toUpdate = await this.typeRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.name) {
      toUpdate.name = dto.name;
    }

    return this.typeRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.typeRepository.delete(id);
  }
}
