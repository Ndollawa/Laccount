import { Module } from '@nestjs/common';
import { AutobotService } from './services/autobot.service';
import { AutobotController } from './autobot.controller';
import { AutobotGateway } from './autobot.gateway';
import { PostService } from 'src/post/post.service';
import { CommentService } from 'src/comment/comment.service';
import { AutobotRepository } from './repositories/autobot.repository';
import { PrismaModule } from '@app/prisma';
import { TasksService } from './services/task.service';
import { PostRepository } from 'src/post/post.repository';
import { CommentRepository } from 'src/comment/comment.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    AutobotService,
    AutobotGateway,
    AutobotRepository,
    PostRepository,
    PostService,
    CommentRepository,
    CommentService,
    TasksService,
  ],
  controllers: [AutobotController],
})
export class AutobotModule {}
