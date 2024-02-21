import { CommentsEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { LikesEntity } from 'src/likes/entities/like.entity';
import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { AudiofileEntity } from 'src/audiofiles/entities/audiofile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('texts') // name of the table
export class TextsEntity {
  @PrimaryGeneratedColumn() //table columns, this one is id hence @primarygeneratedcolumns its all magic methods all the @
  id: number;

  @Column()
  comment_text: string;

  @Column()
  text_markup: string;

  @ApiHideProperty()
  @Column({ default: 0 })
  like_count: number;

  @ManyToOne(() => UserEntity, (user) => user.texts, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CommentsEntity, (comments) => comments.text)
  @JoinColumn()
  comments: CommentsEntity[];

  @OneToMany(() => LikesEntity, (likes) => likes.text)
  @JoinColumn()
  likes: LikesEntity[];

  @ApiHideProperty()
  @OneToMany(
    () => AudioGenerationRequestEntity,
    (generation) => generation.text,
  )
  @JoinColumn()
  generation: AudioGenerationRequestEntity[];

  @ApiHideProperty()
  @OneToMany(() => AudiofileEntity, (audio) => audio.text)
  audio: AudiofileEntity[];
}
