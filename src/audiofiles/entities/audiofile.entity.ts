import { TextsEntity } from 'src/texts/entities/text.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audiofiles')
export class AudiofileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  audio: string;

  @ManyToOne(() => TextsEntity, (text) => text.audio, { eager: true })
  @JoinColumn()
  text: TextsEntity;
}
