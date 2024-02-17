import { ApiHideProperty } from '@nestjs/swagger';
import { AudiofileEntity } from 'src/audiofiles/entities/audiofile.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('texts') // name of the table
export class TextsEntity {
  @PrimaryGeneratedColumn() //table columns, this one is id hence @primarygeneratedcolumns its all magic methods all the @
  id: number;

  @Column()
  text_content: string;

  @Column()
  text_markup: string;

  @ApiHideProperty()
  @Column({ default: 0 })
  like_count: number;

  @ManyToOne(() => UserEntity, (user) => user.texts, {eager: true})
  @JoinColumn()
  user: UserEntity;

  @ApiHideProperty()
  @OneToMany(() => AudiofileEntity, (audio) => audio.text)
  audio: AudiofileEntity[];
}
