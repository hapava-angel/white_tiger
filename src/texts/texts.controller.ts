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
} from '@nestjs/common';
import { TextsService } from './texts.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TextsEntity } from './entities/text.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';

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
  update(@Param('id') id: string, @Body() updateTextDto: UpdateTextDto) {
    return this.textsService.update(+id, updateTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.textsService.remove(+id);
  }
}
