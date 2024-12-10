import { Injectable, Logger } from '@nestjs/common';
import { Message, ViewState } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(protected readonly messageRepository: MessageRepository) {}

  async find(query: any): Promise<Message> {
    try {
      return await this.messageRepository.find(query);
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
  async create(query: any): Promise<Message> {
    try {
      const newMessage = await this.messageRepository.create(query);
      Logger.debug(newMessage);
      return newMessage;
    } catch (error) {
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
