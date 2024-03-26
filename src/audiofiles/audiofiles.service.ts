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

    const filename = `./db_audiofiles/audio_${text.id}_${Date.now()}.wav`;
    audiofile.audio = filename;

    const newAudiofile = await this.audioRepository.save(audiofile);

    text.audio.push(audiofile);
    await this.textRepository.save(text);

    const audioUrl = await this.generateAudio(text.text_markup);
    await this.saveAudioToFile(audioUrl, filename);

    return newAudiofile;
  }

  async generateAudio(text: string): Promise<Buffer> {
    try {
      const url = `http://85.21.8.81:8989/api/v1/audio/generate/?labeled_text=${encodeURIComponent(text)}`;
      const generateResponse = await axios.post(url);
      const jobId = generateResponse.data.job_id;

      let file_url;
      let count_ = 0;
      while (!file_url) {
        try{
          const urlResponse = await axios.get(`http://85.21.8.81:8989/api/v1/audio/job/${jobId}`);
          if (urlResponse.status === 200) {
            file_url = urlResponse.data.file_url;
            console.log(`Attempt ${++count_}: file url received: ${file_url}`);
          } else {
            console.log(
              `Attempt ${++count_}: Response status ${urlResponse.status}`,
            );
          }
        } catch (error) {
          console.error(
            'Error generating audio1:',
            error.response?.data ?? error.message,
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      const audioFileResponse = await axios.get(`http://85.21.8.81:8989/api/v1/audio/get/${file_url}`, { responseType: 'arraybuffer'});
      const audioData: Buffer = Buffer.from(audioFileResponse.data);

      return audioData;

    } catch (error) {
      console.error(
        'Error generating audio:',
        error.response?.data ?? error.message,
      );
      throw new HttpException(
        'Error generating audio',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveAudioToFile(audioData: Buffer, filename: string): Promise<void> {
    try {
      fs.writeFileSync(filename, audioData);
    } catch (error) {
      console.error('Error saving audio to file:', error);
      throw new Error('Error saving audio to file');
    }
  }
  async getAudioPath(id: number): Promise<string> { 
    const audiofile = await this.audioRepository.findOneBy({ id }); 

    if (!audiofile) { 
      throw new NotFoundException('Audiofile not found');
    } 
 
    const filePath = audiofile.audio;
    return filePath; 
  }
  private async generateAudioUrlGoogle(textContent: string): Promise<string> {
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

  private async downloadFileGoogle(url: string, filename: string): Promise<void> {
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
