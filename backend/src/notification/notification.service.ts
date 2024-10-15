import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Notification, ViewState } from '@prisma/client';
import { handleError } from '@app/common';
import { CreateNotificationDto, UpdateNotificationDto } from './dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    protected readonly notificationReNotificationtory: NotificationRepository,
  ) {}

  async find(query: any): Promise<Notification> {
    try {
      return await this.notificationReNotificationtory.find(query);
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Notification[]> {
    try {
      return await this.notificationReNotificationtory.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Notification> {
    try {
      return await this.notificationReNotificationtory.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createNotificationData: CreateNotificationDto,
  ): Promise<Notification> {
    const { type, notification, status, receiverId } = createNotificationData;

    try {
      const existingNotification =
        await this.notificationReNotificationtory.exists({
          where: { OR: [{ notification }, { receiverId }] },
        });

      if (existingNotification) {
        throw new HttpException(
          'Notification with credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }

      const NotificationData = {
        ...createNotificationData,
        status: ViewState.UNREAD,
        // readCount: 12,
        // readingTime: '12 minutes',
      };

      const newNotification = await this.notificationReNotificationtory.create({
        data: NotificationData,
      });
      Logger.debug(newNotification);
      return newNotification;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateNotificationData: UpdateNotificationDto) {
    try {
      return await this.notificationReNotificationtory.update({
        where: { id },
        data: updateNotificationData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateNotificationData: UpdateNotificationDto) {
    try {
      return await this.notificationReNotificationtory.upsert({
        where: { id },
        data: updateNotificationData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
