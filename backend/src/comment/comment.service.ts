import { Injectable, Logger } from '@nestjs/common';
import { Comment, CommentStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(protected readonly commentRepository: CommentRepository) {}

  async find(id: string): Promise<Comment> {
    try {
      return await this.commentRepository.find({
        where: { id },
        include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Comment[]> {
    try {
      return await this.commentRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Comment> {
    try {
      return await this.commentRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createCommentData: CreateCommentDto): Promise<Comment> {
    // const { commentId } = createCommentData;

    try {
      // const existingComment = await this.commentRepository.exists({
      //   where: { commentId },
      // });

      // if (existingComment) {
      //   throw new HttpException(
      //     'Comment with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const commentData = {
        ...createCommentData,
        status: CommentStatus.PUBLISHED,
      };

      const newComment = await this.commentRepository.create({
        data: commentData,
      });
      Logger.debug(newComment);
      return newComment;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateCommentData: UpdateCommentDto) {
    try {
      return await this.commentRepository.update({
        where: { id },
        data: updateCommentData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateCommentData: UpdateCommentDto) {
    Logger.debug(updateCommentData);

    try {
      return await this.commentRepository.upsert({
        where: { id },
        data: updateCommentData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
