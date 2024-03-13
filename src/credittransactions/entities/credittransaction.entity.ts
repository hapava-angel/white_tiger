import { TypeEntity } from 'src/type/entities/type.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class CreditTransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ammount: GLfloat;

  @CreateDateColumn({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => UserEntity, (user) => user.credits, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => TypeEntity, (type) => type.credit_type)
  @JoinColumn()
  type: TypeEntity;
}

//для создания данного модуля существуют специальныйе бибилиотеки, поэтому на данном этапе разработки оставляем controllers, servises и modules дефолтными.
