import { UserEntity } from 'src/user/entities/user.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('likes')
export class LikesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['yes'],
  })
  like: string;

  @CreateDateColumn({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => UserEntity, (user) => user.likes, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TextsEntity, (text) => text.likes, { eager: true })
  @JoinColumn()
  text: TextsEntity;
}
