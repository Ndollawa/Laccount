import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
  providers: [CommentRepository, CommentService],
  exports: [CommentRepository, CommentService],
})
export class CommentModule {}
