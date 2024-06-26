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
import { AudioGenerationRequestsService } from './audiogenerationrequests.service';
import { CreateAudioGenerationRequestDto } from './dto/create-audiogenerationrequest.dto';
import { UpdateAudiogenerationRequestDto } from './dto/update-audiogenerationrequest.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
// import { ComplexGuard } from 'src/auth/guards/complex.guard';
// import { GoogleOAuthGuard } from 'src/auth/guards/google.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@ApiTags('audiogenerationrequests')
@Controller('audiogenerationrequests')
export class AudioGenerationRequestsController {
  constructor(
    private readonly audiogenerationrequestsService: AudioGenerationRequestsService,
  ) {}

  @Post()
  create(
    @Body() createAudiogenerationrequestDto: CreateAudioGenerationRequestDto,
  ) {
    return this.audiogenerationrequestsService.create(
      createAudiogenerationrequestDto,
    );
  }

  @Get()
  findAll() {
    return this.audiogenerationrequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiogenerationrequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAudiogenerationrequestDto: UpdateAudiogenerationRequestDto,
  ) {
    return this.audiogenerationrequestsService.update(
      +id,
      updateAudiogenerationrequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audiogenerationrequestsService.remove(+id);
  }
}
