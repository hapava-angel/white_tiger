import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TextsModule } from './texts/texts.module';
import { AudiofilesModule } from './audiofiles/audiofiles.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AudiogenerationrequestsModule } from './audiogenerationrequests/audiogenerationrequests.module';
import { CreditTransactionsModule } from './credittransactions/credittransactions.module';
import { getPostgresConfig } from './configs/postgres.config';
import { RoleModule } from './role/role.module';
import { TypeModule } from './type/type.module';
import { StatusModule } from './status/status.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    UserModule,
    TextsModule,
    AudiofilesModule,
    CommentsModule,
    LikesModule,
    AudiogenerationrequestsModule,
    CreditTransactionsModule,
    RoleModule,
    TypeModule,
    StatusModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
