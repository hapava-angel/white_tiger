import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
