import { CreditTransactionEntity } from 'src/credittransactions/entities/credittransaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => CreditTransactionEntity, (credit_type) => credit_type.type)
  credit_type: CreditTransactionEntity[];
}
