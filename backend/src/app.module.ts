import { Module } from '@nestjs/common';
import { AutobotModule } from './autobot/autobot.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from '@app/prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      cache: true,
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 5 }]),
    AutobotModule,
    PostModule,
    CommentModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
