import { ApiHideProperty } from '@nestjs/swagger';
import { TextsEntity } from 'src/texts/entities/text.entity';
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
}
