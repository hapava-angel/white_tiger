import { CreditTransactionEntity } from 'src/credittransactions/entities/credittransaction.entity';
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

  // @ApiHideProperty()
  @ManyToOne(() => TextsEntity, (text) => text.generation)
  @JoinColumn()
  text: TextsEntity;

  // @ApiHideProperty()
  @ManyToOne(() => CreditTransactionEntity, (credits) => credits.generation)
  @JoinColumn()
  credits: CreditTransactionEntity[];

  @OneToMany(() => StatusEntity, (status) => status.generation_status)
  @JoinColumn()
  status: StatusEntity[];
}
