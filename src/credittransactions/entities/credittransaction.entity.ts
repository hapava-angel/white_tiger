import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import { TypeEntity } from 'src/type/entities/type.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  //ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  //OneToMany,
  // OneToOne,
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

  @OneToMany(
    () => AudioGenerationRequestEntity,
    (generation) => generation.credits,
  )
  @JoinColumn()
  generation: AudioGenerationRequestEntity[];

  @OneToOne(() => TypeEntity, (type) => type.credit_type)
  @JoinColumn()
  type: TypeEntity[];
}
