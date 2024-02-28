import { ApiHideProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role') // name of the table
export class RoleEntity {
  @PrimaryGeneratedColumn() //table columns, this one is id hence @primarygeneratedcolumns its all magic methods all the @
  id: number;

  @Column()
  title: string;

  @ApiHideProperty()
  @OneToOne(() => UserEntity, (user) => user.role)
  user: UserEntity;
}
