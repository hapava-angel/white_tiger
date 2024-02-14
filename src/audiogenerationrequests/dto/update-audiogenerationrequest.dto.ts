import { PartialType } from '@nestjs/mapped-types';
import { CreateAudiogenerationrequestDto } from './create-audiogenerationrequest.dto';

export class UpdateAudiogenerationrequestDto extends PartialType(
  CreateAudiogenerationrequestDto,
) {}
