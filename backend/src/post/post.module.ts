import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PrismaService } from '@app/prisma';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService],
})
export class PostModule {}
