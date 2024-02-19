import { ApiHideProperty } from '@nestjs/swagger';
import { CommentsEntity } from 'src/comments/entities/comment.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { LikesEntity } from 'src/likes/entities/like.entity';
import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ApiHideProperty()
  @Column({ type: 'float', default: 0 })
  credits: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiHideProperty()
  @OneToMany(() => TextsEntity, (text) => text.user)
  texts: TextsEntity[];

  @ApiHideProperty()
  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: TextsEntity[];

  @ApiHideProperty()
  @OneToMany(() => LikesEntity, (likes) => likes.user)
  likes: TextsEntity[];

  @ApiHideProperty()
  @OneToMany(() => AudioGenerationRequestEntity, (likes) => likes.user)
  generation: AudioGenerationRequestEntity[];
}
