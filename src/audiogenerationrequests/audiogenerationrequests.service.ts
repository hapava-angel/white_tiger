import { Injectable } from '@nestjs/common';
import { CreateAudioGenerationRequestDto } from './dto/create-audiogenerationrequest.dto';
import { UpdateAudiogenerationRequestDto } from './dto/update-audiogenerationrequest.dto';

@Injectable()
export class AudioGenerationRequestsService {
  create(createAudiogenerationrequestDto: CreateAudioGenerationRequestDto) {
    return 'This action adds a new audiogenerationrequest';
  }

  findAll() {
    return `This action returns all audiogenerationrequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audiogenerationrequest`;
  }

  update(
    id: number,
    updateAudiogenerationrequestDto: UpdateAudiogenerationRequestDto,
  ) {
    return `This action updates a #${id} audiogenerationrequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} audiogenerationrequest`;
  }
}
