import { Injectable, Logger } from '@nestjs/common';
import {
  Subscription,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '@prisma/client';
import { handleError } from '@app/common';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    protected readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async find(id: string): Promise<Subscription> {
    try {
      return await this.subscriptionRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<Subscription[]> {
    try {
      return await this.subscriptionRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<Subscription> {
    try {
      return await this.subscriptionRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createSubscriptionData: CreateSubscriptionDto,
  ): Promise<Subscription> {
    // const { authorId } = createSubscriptionData;

    try {
      // const existingSubscription = await this.subscriptionRepository.exists({
      //   where: { subscriptionId },
      // });

      // if (existingSubscription) {
      //   throw new HttpException(
      //     'Subscription with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      // const subscriptionData = {
      //   ...createSubscriptionData,
      //   userId,
      //   planId,
      //   description,
      //   paymentMethod,
      //   status,
      //   amount,
      //   currency,
      //   startsAt,
      //   endsAt,
      //   cancelAt,
      //   cancelledAt,
      //   type,
      // };

      const newSubscription = await this.subscriptionRepository.create({
        data: createSubscriptionData,
      });
      Logger.debug(newSubscription);
      return newSubscription;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateSubscriptionData: UpdateSubscriptionDto) {
    try {
      return await this.subscriptionRepository.update({
        where: { id },
        data: updateSubscriptionData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateSubscriptionData: UpdateSubscriptionDto) {
    Logger.debug(updateSubscriptionData);

    try {
      return await this.subscriptionRepository.upsert({
        where: { id },
        data: updateSubscriptionData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
