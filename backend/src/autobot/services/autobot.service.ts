import { handleError } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateAutobotDto } from '../dto/create-autobot.dto';
import { UpdateAutobotDto } from '../dto/update-autobot.dto';
import { Autobot } from '@prisma/client';
import { AutobotRepository } from '../repositories/autobot.repository';
import { AutobotGateway } from '../autobot.gateway';
import { CommentService } from 'src/comment/comment.service';
import { PostService } from 'src/post/post.service';
import axios from 'axios';

@Injectable()
export class AutobotService {
  constructor(
    protected readonly autobotRepository: AutobotRepository,
    private readonly autobotGateway: AutobotGateway,
    protected readonly commentService: CommentService,
    protected readonly postService: PostService,
  ) {}

  async find(id: string): Promise<Autobot> {
    try {
      return await this.autobotRepository.find({
        where: { id },
        include: {
          posts: {
            include: {
              comments: true,
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Autobot[]> {
    try {
      const autobotCounts = await this.autobotRepository.findMany(query);
      await this.autobotGateway.updateAutobotCount(autobotCounts.length);
      return autobotCounts;
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Autobot> {
    try {
      return await this.autobotRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async generateAutobots() {
    const autobots = [];
    for (let i = 1; i <= 500; i++) {
   
      const autobot = await this.autobotRepository.create({
        data: {
          name: `Bot ${Date.now().toString()}`,
        },
      });
      // Create 10 posts for each Autobot
      for (let j = 0; j < 10; j++) {
        const { data: post } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/3`,//${j}
        );

        // Create a new Post associated with the Autobot
        const newPost = await this.postService.create({
          title: `${post.title}-${Date.now().toLocaleString()}`,
          body: post.body,
          authorId: autobot.id,
        });

        // Create 10 comments for each post
        for (let k = 0; k < 10; k++) {
          const { data: comment } = await axios.get(
            `https://jsonplaceholder.typicode.com/comments/1`, //${k}
          );

          // Create a new Comment associated with the Post
          await this.commentService.create({
            comment: comment.body,
            postId: newPost.id,
            authorId: autobot.id,
          });
        }
        autobots.push(autobot);
      // Emit the new count to all connected clients
       await this.autobotGateway.updateAutobotCount(autobots.length);
      }

    }
    const autobotsCount = await this.autobotRepository.count({});
    return autobotsCount;
  }

  async update(id: string, updateAutobotData: UpdateAutobotDto) {
    try {
      return await this.autobotRepository.update({
        where: { id },
        data: updateAutobotData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateAutobotData: UpdateAutobotDto) {
    try {
      return await this.autobotRepository.upsert({
        where: { id },
        data: updateAutobotData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
