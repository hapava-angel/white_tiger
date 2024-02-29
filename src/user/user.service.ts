import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    const user = new UserEntity();
    user.username = dto.username;
    user.email = dto.email;
    user.password = password;
    user.credits = dto.credits;

    const newUser = await this.userRepository.save(user);

    const role = await this.roleRepository.findOne({
      where: { id: dto.roleId },
      relations: ['user'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    role.user = user;

    await this.roleRepository.save(role);

    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateUserDto) {
    const toUpdate = await this.userRepository.findOneBy({ id });
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

    return this.userRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
