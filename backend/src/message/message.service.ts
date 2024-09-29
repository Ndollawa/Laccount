import { Injectable, Logger } from '@nestjs/common';
import { Message, ViewState } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(protected readonly messageRepository: MessageRepository) {}

  async find(id: string): Promise<Message> {
    try {
      return await this.messageRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Message[]> {
    try {
      return await this.messageRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Message> {
    try {
      return await this.messageRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(createMessageData: CreateMessageDto): Promise<Message> {
    // const { authorId } = createMessageData;

    try {
      // const existingMessage = await this.messageRepository.exists({
      //   where: { messageId },
      // });

      // if (existingMessage) {
      //   throw new HttpException(
      //     'Message with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const messageData = {
        ...createMessageData,
      };

      const newMessage = await this.messageRepository.create({
        data: messageData,
      });
      Logger.debug(newMessage);
      return newMessage;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateMessageData: UpdateMessageDto) {
    try {
      return await this.messageRepository.update({
        where: { id },
        data: updateMessageData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateMessageData: UpdateMessageDto) {
    Logger.debug(updateMessageData);

    try {
      return await this.messageRepository.upsert({
        where: { id },
        data: updateMessageData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
