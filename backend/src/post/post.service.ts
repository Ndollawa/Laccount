import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Post, PublishStatus } from '@prisma/client';
import { handleError, totalReadTime } from '@app/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(protected readonly postRepository: PostRepository) {}

  async find(id: any): Promise<Post> {
    try {
      return await this.postRepository.find({
        where: { id },
        include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Post[]> {
    try {
      return await this.postRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Post> {
    try {
      return await this.postRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    createPostData: CreatePostDto & { authorId: string },
    file: Express.Multer.File,
  ): Promise<Post> {
    const { title, body } = createPostData;

    try {
      const existingPost = await this.postRepository.exists({
        where: { title },
      });

      if (existingPost) {
        throw new HttpException(
          'Post with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }
      const read = totalReadTime(body);

      const postData = {
        ...createPostData,
        status: PublishStatus.PUBLISHED,
        readCount: read.wordCount as number,
        readingTime: read.totalTime as string,
        image: !file ? null : file.filename,
      };

      const newPost = await this.postRepository.create({
        data: postData,
      });
      return newPost;
    } catch (error) {
      handleError(error);
    }
  }

  async update(
    id: string,
    updatePostData: UpdatePostDto & { authorId: string },
    file: Express.Multer.File,
  ) {
    const { title, body } = updatePostData;
    try {
      const read = totalReadTime(body);

      const postData = {
        ...updatePostData,
        status: PublishStatus.PUBLISHED,
        readCount: read.wordCount as number,
        readingTime: read.totalTime as string,
      };
      const data = !file ? postData : { ...postData, image: file.filename };
      return await this.postRepository.update({
        where: { id },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(
    id: string,
    updatePostData: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    const { title, body } = updatePostData;
    try {
      const read = totalReadTime(body);

      const postData = {
        ...updatePostData,
        status: PublishStatus.PUBLISHED,
        readCount: read.wordCount as number,
        readingTime: read.totalTime as string,
      };
      const data = !file ? postData : { ...postData, image: file.filename };
      return await this.postRepository.upsert({
        where: { id },
        data,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
