import { PartialType } from '@nestjs/mapped-types';
import { CreateAudioGenerationRequestDto } from './create-audiogenerationrequest.dto';

export class UpdateAudiogenerationRequestDto extends PartialType(
  CreateAudioGenerationRequestDto,
) {}
