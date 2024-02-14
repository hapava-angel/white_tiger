import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CredittransactionsService } from './credittransactions.service';
import { CreateCredittransactionDto } from './dto/create-credittransaction.dto';
import { UpdateCredittransactionDto } from './dto/update-credittransaction.dto';

@Controller('credittransactions')
export class CredittransactionsController {
  constructor(
    private readonly credittransactionsService: CredittransactionsService,
  ) {}

  @Post()
  create(@Body() createCredittransactionDto: CreateCredittransactionDto) {
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
    @Body() updateCredittransactionDto: UpdateCredittransactionDto,
  ) {
    return this.credittransactionsService.update(
      +id,
      updateCredittransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credittransactionsService.remove(+id);
  }
}
