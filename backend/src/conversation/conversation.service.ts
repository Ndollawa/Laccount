import { Injectable, Logger } from '@nestjs/common';
import { Conversation, ActiveStatus } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateConversationDto, UpdateConversationDto } from './dto';
import { ConversationRepository } from './conversation.repository';

@Injectable()
export class ConversationService {
  constructor(
    protected readonly conversationRepository: ConversationRepository,
  ) {}

  async find(id: string): Promise<Conversation> {
    try {
      return await this.conversationRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Conversation[]> {
    try {
      return await this.conversationRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Conversation> {
    try {
      return await this.conversationRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createConversationData: CreateConversationDto,
  ): Promise<Conversation> {
    // const { authorId } = createConversationData;

    try {
      // const existingConversation = await this.conversationRepository.exists({
      //   where: { conversationId },
      // });

      // if (existingConversation) {
      //   throw new HttpException(
      //     'Conversation with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const conversationData = {
        ...createConversationData,
      };

      const newConversation = await this.conversationRepository.create({
        data: conversationData,
      });
      Logger.debug(newConversation);
      return newConversation;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateConversationData: UpdateConversationDto) {
    try {
      return await this.conversationRepository.update({
        where: { id },
        data: updateConversationData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateConversationData: UpdateConversationDto) {
    Logger.debug(updateConversationData);

    try {
      return await this.conversationRepository.upsert({
        where: { id },
        data: updateConversationData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
