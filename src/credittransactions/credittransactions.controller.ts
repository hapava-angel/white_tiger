import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreditTransactionsService } from './credittransactions.service';
import { CreateCreditTransactionDto } from './dto/create-credittransaction.dto';
import { UpdateCreditTransactionDto } from './dto/update-credittransaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ComplexGuard } from 'src/auth/guards/complex.guard';

@ApiBearerAuth()
@UseGuards(ComplexGuard)
@ApiTags('credittransactions')
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
