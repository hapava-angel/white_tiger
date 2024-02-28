import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('status')
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['ожидание', 'завершено', 'отмена'],
  })
  name: string;

  @ManyToOne(
    () => AudioGenerationRequestEntity,
    (generation_status) => generation_status.status,
  )
  @JoinColumn()
  generation_status: AudioGenerationRequestEntity[];
}
