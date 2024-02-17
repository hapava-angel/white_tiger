import { CreditTransaction } from 'src/credittransactions/entities/credittransaction.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  //ManyToMany,
  ManyToOne,
  //OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('generation')
export class AudioGenerationRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: GLfloat;

  @Column()
  status: string; //может не строка, а array если есть ограниченное кол-во значений(маркеров) "ожидание", "завершено", ”отмена”

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
  @OneToOne(() => CreditTransaction, (credits) => credits.generation)
  @JoinColumn()
  credits: CreditTransaction;
}
