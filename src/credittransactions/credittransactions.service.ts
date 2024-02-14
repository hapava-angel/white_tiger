import { Injectable } from '@nestjs/common';
import { CreateCredittransactionDto } from './dto/create-credittransaction.dto';
import { UpdateCredittransactionDto } from './dto/update-credittransaction.dto';

@Injectable()
export class CredittransactionsService {
  create(createCredittransactionDto: CreateCredittransactionDto) {
    return 'This action adds a new credittransaction';
  }

  findAll() {
    return `This action returns all credittransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credittransaction`;
  }

  update(id: number, updateCredittransactionDto: UpdateCredittransactionDto) {
    return `This action updates a #${id} credittransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} credittransaction`;
  }
}
