import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Post, PostStatus } from '@prisma/client';
import { handleError } from '@app/common';
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
  async create(createPostData: CreatePostDto): Promise<Post> {
    const { title } = createPostData;

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

      const postData = {
        ...createPostData,
        status: PostStatus.PUBLISHED,
      };

      const newPost = await this.postRepository.create({
        data: postData,
      });
      Logger.debug(newPost);
      return newPost;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updatePostData: UpdatePostDto) {
    try {
      return await this.postRepository.update({
        where: { id },
        data: updatePostData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updatePostData: UpdatePostDto) {
    try {
      return await this.postRepository.upsert({
        where: { id },
        data: updatePostData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
