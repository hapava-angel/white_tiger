import { CreditTransactionEntity } from 'src/credittransactions/entities/credittransaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('type')
export class TypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['пополнение', 'списание'],
  })
  name: string;

  @OneToOne(() => CreditTransactionEntity, (credit_type) => credit_type.type)
  @JoinColumn()
  credit_type: CreditTransactionEntity[];
}
