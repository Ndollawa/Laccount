import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SavedItem } from '@prisma/client';
import { handleError } from '@app/common';
import { SavedItemRepository } from './savedItem.repository';
import { CreateSavedItemDto, UpdateSavedItemDto } from './dto';

@Injectable()
export class SavedItemService {
  constructor(
    protected readonly savedItemRepository: SavedItemRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async find(userId: string): Promise<SavedItem[]> {
    try {
      return await this.savedItemRepository.findMany({
        where: { userId },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    userId: string,
    createSavedItemDto: CreateSavedItemDto,
  ): Promise<SavedItem> {
    try {
      return this.savedItemRepository.create({
        data: {
          userId,
          listingId: createSavedItemDto.listingId,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async update(userId: string, data: UpdateSavedItemDto) {
    try {
      return await this.savedItemRepository.update({
        where: { userId },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(userId: string, data: UpdateSavedItemDto) {
    try {
      return await this.savedItemRepository.upsert({
        where: { userId },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(userId: string, listingId: string): Promise<SavedItem> {
    try {
      return await this.savedItemRepository.deleteMany({
        where: { userId, listingId },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // @OnEvent('SavedItem-created')
  // sendVerificationEmail(payload: SavedItem) {
  //   console.log(payload);
  //   return this.mailClient.emit('sendMail', payload);
  // }
}
