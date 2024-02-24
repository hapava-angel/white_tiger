import { TextsEntity } from 'src/texts/entities/text.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('audiofiles') // name of the table
export class AudiofileEntity {
  @PrimaryGeneratedColumn() //table columns, this one is id hence @primarygeneratedcolumns its all magic methods all the @
  id: number;

  @Column()
  audio: string;

  @ManyToOne(() => TextsEntity, (text) => text.audio, { eager: true })
  @JoinColumn()
  text: TextsEntity;
}
