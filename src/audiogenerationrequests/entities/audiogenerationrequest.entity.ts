import { StatusEntity } from 'src/status/entities/status.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('generation')
export class AudioGenerationRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: GLfloat;

  @CreateDateColumn({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => UserEntity, (user) => user.generation, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TextsEntity, (text) => text.generation)
  @JoinColumn()
  text: TextsEntity;

  @OneToMany(() => StatusEntity, (status) => status.generation_status)
  @JoinColumn()
  status: StatusEntity[];
}

//для создания данного модуля существуют специальныйе бибилиотеки, поэтому на данном этапе разработки оставляем controllers, servises и modules дефолтными.
