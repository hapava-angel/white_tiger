import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAudiofileDto } from './dto/create-audiofile.dto';
import { UpdateAudiofileDto } from './dto/update-audiofile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AudiofileEntity } from './entities/audiofile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { TextsEntity } from 'src/texts/entities/text.entity';
import * as googleTTS from 'google-tts-api';
import axios from 'axios';
import * as fs from 'fs';
import { parseString } from 'xml2js';

@Injectable()
export class AudiofilesService {
  constructor(
    @InjectRepository(AudiofileEntity)
    private audioRepository: Repository<AudiofileEntity>,

    @InjectRepository(TextsEntity)
    private textRepository: Repository<TextsEntity>,
  ) {}

  async create(dto: CreateAudiofileDto): Promise<AudiofileEntity> {
    const audiofile = new AudiofileEntity();

    const text = await this.textRepository.findOne({
      where: { id: dto.textId },
      relations: ['audio'],
    });

    if (!text) {
      throw new NotFoundException('Text not found');
    }

    const filename = `./db_audiofiles/audio_${text.id}_${Date.now()}.mp3`;
    audiofile.audio = filename;

    const newAudiofile = await this.audioRepository.save(audiofile);

    text.audio.push(audiofile);
    await this.textRepository.save(text);

    const audioUrl = await this.generateAudioUrl(text.text_markup);
    await this.downloadFile(audioUrl, filename);

    return newAudiofile;
  }

  // async generateAudio(text: string): Promise<Buffer> {
  //   try {
  //     const jsonResult = await parseString(text, { mergeAttrs: true });
  //     // Step 1: Send text to generate audio and get job ID
  //     const generateResponse = await axios.post('http://85.21.8.81:8989/audio/generate', { jsonResult });
  //     const jobId: string = generateResponse.data.job_id;

  //     // Step 2: Get audio URL using job ID
  //     const urlResponse = await axios.get(`http://85.21.8.81:8989/audio/job/${jobId}`);
  //     const audioUrl: string = urlResponse.data.file_url;

  //     // Step 3: Download audio file from URL
  //     const audioFileResponse = await axios.get(`http://85.21.8.81:8989/audio/get/${audioUrl}`, { responseType: 'arraybuffer' });

  //     // Assuming the audio file is returned as binary data
  //     const audioData: Buffer = Buffer.from(audioFileResponse.data);

  //     // Return the audio file data
  //     return audioData;
  //   } catch (error) {
  //     console.error(
  //       'Error generating audio:',
  //       error.response?.data ?? error.message,
  //     );
  //     throw new HttpException(
  //       'Error generating audio',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // async saveAudioToFile(audioData: Buffer, filename: string): Promise<void> {
  //   try {
  //     fs.writeFileSync(filename, audioData);
  //   } catch (error) {
  //     console.error('Error saving audio to file:', error);
  //     throw new Error('Error saving audio to file');
  //   }
  // }

  private async generateAudioUrl(textContent: string): Promise<string> {
    try {
      const audioUrl = await googleTTS.getAudioUrl(textContent, {
        lang: 'en',
        slow: false,
      });
      return audioUrl;
    } catch (error) {
      throw new Error(`Error generating audio URL: ${error}`);
    }
  }

  private async downloadFile(url: string, filename: string): Promise<void> {
    try {
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(filename);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    } catch (error) {
      throw new Error(`Error downloading and saving audio file: ${error}`);
    }
  }


  async findAll(): Promise<AudiofileEntity[]> {
    return this.audioRepository.find();
  }

  async findOne(id: number): Promise<AudiofileEntity> {
    return this.audioRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateAudiofileDto,
    audio: Express.Multer.File,
  ) {
    const toUpdate = await this.audioRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не найдено`);
    }
    if (audio) {
      if (toUpdate.audio !== audio.filename) {
        fs.unlink(`db_audiofiles/${toUpdate.audio}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.audio = audio.filename;
    }
    return this.audioRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.audioRepository.delete(id);
  }
}
// function parseString(xmlString: any, arg1: { mergeAttrs: boolean; }) {
//   throw new Error('Function not implemented.');
// }

