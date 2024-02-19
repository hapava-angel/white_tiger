import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditTransactionsService } from './credittransactions.service';
import { CreateCreditTransactionDto } from './dto/create-credittransaction.dto';
import { UpdateCreditTransactionDto } from './dto/update-credittransaction.dto';

@Controller('credittransactions')
export class CreditTransactionsController {
  constructor(
    private readonly credittransactionsService: CreditTransactionsService,
  ) {}

  @Post()
  create(@Body() createCredittransactionDto: CreateCreditTransactionDto) {
    return this.credittransactionsService.create(createCredittransactionDto);
  }

  @Get()
  findAll() {
    return this.credittransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.credittransactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCreditTransactionDto: UpdateCreditTransactionDto,
  ) {
    return this.credittransactionsService.update(
      +id,
      updateCreditTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credittransactionsService.remove(+id);
  }
}
