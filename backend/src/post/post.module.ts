import { Module } from '@nestjs/common';
import { PostService, PostRepository, PostController } from './';
import { PrismaService } from '@app/prisma';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService],
})
export class PostModule {}
