import { StatusEntity } from 'src/status/entities/status.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('generation')
export class AudioGenerationRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 50 })
  cost: GLfloat;

  @CreateDateColumn({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => UserEntity, (user) => user.generation)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TextsEntity, (text) => text.generation)
  @JoinColumn()
  text: TextsEntity;

  @ManyToOne(() => StatusEntity, (status) => status.generation_status)
  @JoinColumn()
  status: StatusEntity;
}

//для создания данного модуля существуют специальныйе бибилиотеки, поэтому на данном этапе разработки оставляем controllers, servises и modules дефолтными.
