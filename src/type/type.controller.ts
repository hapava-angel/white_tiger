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
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
// import { ComplexGuard } from 'src/auth/guards/complex.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@ApiTags('type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.delete(+id);
  }
}
