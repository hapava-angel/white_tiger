import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreditTransactionDto } from './dto/create-credittransaction.dto';
import { UpdateCreditTransactionDto } from './dto/update-credittransaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditTransactionEntity } from './entities/credittransaction.entity';
import { Repository } from 'typeorm';
import { TypeEntity } from 'src/type/entities/type.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { InsufficientCreditsException } from 'src/custom-exeptions';

@Injectable()
export class CreditTransactionsService {
  constructor(
    @InjectRepository(CreditTransactionEntity)
    private transactionRepository: Repository<CreditTransactionEntity>,

    @InjectRepository(TypeEntity)
    private typeRepository: Repository<TypeEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateCreditTransactionDto) {
    const transaction = new CreditTransactionEntity();
    transaction.ammount = dto.ammount;

    const user = await this.userRepository.findOne({
      where: { id: dto.userId },
      relations: ['transaction'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const type = await this.typeRepository.findOne({
      where: { id: dto.typeId },
      relations: ['credit_type'],
    });

    if (!type) {
      throw new NotFoundException('Type not found');
    } else {
      if (type.name === 'пополнение') {
        user.credits += transaction.ammount;
      } else {
        if (type.name === 'списание') {
          if (user.credits < transaction.ammount){
            throw new InsufficientCreditsException('Not enough credits')
          } else user.credits -= transaction.ammount;
        }
      }

      const newTransaction = await this.transactionRepository.save(transaction);

      user.transaction.push(transaction);
      await this.userRepository.save(user);

      type.credit_type.push(transaction);
      await this.typeRepository.save(type);

      return newTransaction;
    }
  }
  findAll() {
    return `This action returns all credittransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credittransaction`;
  }

  update(id: number, updateCredittransactionDto: UpdateCreditTransactionDto) {
    return `This action updates a #${id} credittransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} credittransaction`;
  }
}
