import { UserEntity } from 'src/user/entities/user.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('comments')
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment_text: string;

  @CreateDateColumn({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => UserEntity, (user) => user.comments, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TextsEntity, (text) => text.comments, { eager: true })
  @JoinColumn()
  text: TextsEntity;
}
