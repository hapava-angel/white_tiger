import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('status')
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['ожидание', 'завершено', 'отмена'],
  })
  name: string;

  @OneToMany(
    () => AudioGenerationRequestEntity,
    (generation_status) => generation_status.status,
  )
  generation_status: AudioGenerationRequestEntity[];
}
