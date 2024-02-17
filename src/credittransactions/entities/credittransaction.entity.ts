import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
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

@Entity('transactions')
export class CreditTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; //может не строка, а array если есть ограниченное кол-во значений(маркеров) "пополнение", "списание"

  @Column()
  ammount: GLfloat;

  @CreateDateColumn({ type: 'timestamp' })
  time: Date;

  @ManyToOne(() => UserEntity, (user) => user.credits, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @OneToOne(
    () => AudioGenerationRequestEntity,
    (generation) => generation.credits,
  )
  @JoinColumn()
  generation: AudioGenerationRequestEntity;
}
