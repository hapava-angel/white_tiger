import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TextsModule } from './texts/texts.module';
import { AudiofilesModule } from './audiofiles/audiofiles.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AudiogenerationrequestsModule } from './audiogenerationrequests/audiogenerationrequests.module';
import { CredittransactionsModule } from './credittransactions/credittransactions.module';

@Module({
  imports: [
    UserModule,
    TextsModule,
    AudiofilesModule,
    CommentsModule,
    LikesModule,
    AudiogenerationrequestsModule,
    CredittransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
