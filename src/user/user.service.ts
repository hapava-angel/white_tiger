import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    return await this.repository.save({
      username: dto.username,
      email: dto.email,
      password: password,
      credits: dto.credits,
      roleId: dto.roleId,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUserDto) {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (dto.username) {
      toUpdate.username = dto.username;
    }
    if (dto.password) {
      const salt = await bcrypt.genSalt();
      toUpdate.password = await bcrypt.hash(dto.password, salt);
    }
    if (dto.email) {
      toUpdate.email = dto.email;
    }
    if (dto.credits) {
      toUpdate.credits = dto.credits;
    }
    if (dto.roleId) throw new BadRequestException(`Роль нельзя менять`);

    return this.repository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
