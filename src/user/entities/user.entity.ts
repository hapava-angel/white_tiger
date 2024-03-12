import { ApiHideProperty } from '@nestjs/swagger';
import { CommentsEntity } from 'src/comments/entities/comment.entity';
import { TextsEntity } from 'src/texts/entities/text.entity';
import { LikesEntity } from 'src/likes/entities/like.entity';
import { AudioGenerationRequestEntity } from 'src/audiogenerationrequests/entities/audiogenerationrequest.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  // OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from 'src/role/entities/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'float', default: 0 })
  credits: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiHideProperty()
  @OneToMany(() => TextsEntity, (text) => text.user)
  texts: TextsEntity[];

  @ApiHideProperty()
  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];

  @ApiHideProperty()
  @OneToMany(() => LikesEntity, (likes) => likes.user)
  likes: LikesEntity[];

  @ApiHideProperty()
  @OneToMany(
    () => AudioGenerationRequestEntity,
    (generation) => generation.user,
  )
  generation: AudioGenerationRequestEntity[];


  @ApiHideProperty()
  @ManyToOne(() => RoleEntity, (role) => role.user)
  @JoinColumn()
  role: RoleEntity;


}
