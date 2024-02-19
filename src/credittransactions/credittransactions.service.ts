import { Injectable } from '@nestjs/common';
import { CreateCreditTransactionDto } from './dto/create-credittransaction.dto';
import { UpdateCreditTransactionDto } from './dto/update-credittransaction.dto';

@Injectable()
export class CreditTransactionsService {
  create(createCredittransactionDto: CreateCreditTransactionDto) {
    return 'This action adds a new credittransaction';
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
