import { Injectable } from '@nestjs/common';
import { CreateAudiogenerationrequestDto } from './dto/create-audiogenerationrequest.dto';
import { UpdateAudiogenerationrequestDto } from './dto/update-audiogenerationrequest.dto';

@Injectable()
export class AudiogenerationrequestsService {
  create(createAudiogenerationrequestDto: CreateAudiogenerationrequestDto) {
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
    updateAudiogenerationrequestDto: UpdateAudiogenerationrequestDto,
  ) {
    return `This action updates a #${id} audiogenerationrequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} audiogenerationrequest`;
  }
}
