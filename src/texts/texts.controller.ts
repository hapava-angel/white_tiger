import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { TextsService } from './texts.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TextsEntity } from './entities/text.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('texts')
@Controller('texts')
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('text_content', { storage: fileStorage }))
  create(
    @Body() createTextDto: CreateTextDto,
    @UploadedFile() text_content: Express.Multer.File,
  ): Promise<TextsEntity> {
    return this.textsService.create(createTextDto, text_content);
  }

  @Get()
  findAll() {
    return this.textsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.textsService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('text_content', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() updateTextDto: UpdateTextDto,
    @UploadedFile() text_content: Express.Multer.File,
  ): Promise<TextsEntity> {
    return this.textsService.update(+id, updateTextDto, text_content);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.textsService.delete(+id);
  }
}
