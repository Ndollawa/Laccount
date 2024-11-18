import { Injectable, Logger } from '@nestjs/common';
import {
  SubscriptionPlan,
  PlanType,
  PaymentFrequency,
} from '@prisma/client';
import { handleError } from '@app/common';
import { UpdateSubscriptionPlanDto, CreateSubscriptionPlanDto } from './dto';
import { SubscriptionPlanRepository } from './subscriptionPlan.repository';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    protected readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {}

  async find(id: string): Promise<SubscriptionPlan> {
    try {
      return await this.subscriptionPlanRepository.find({
        where: { id },
        // include: { author: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<SubscriptionPlan[]> {
    try {
      return await this.subscriptionPlanRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }
  async remove(id: string): Promise<SubscriptionPlan> {
    try {
      return await this.subscriptionPlanRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }
  async create(
    createSubscriptionPlanData: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    // const { authorId } = createSubscriptionPlanData;

    try {
      // const existingSubscriptionPlan = await this.subscriptionPlanRepository.exists({
      //   where: { subscriptionPlanId },
      // });

      // if (existingSubscriptionPlan) {
      //   throw new HttpException(
      //     'SubscriptionPlan with credentials already exists.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const subscriptionPlanData = {
        ...createSubscriptionPlanData,
      };

      const newSubscriptionPlan = await this.subscriptionPlanRepository.create({
        data: subscriptionPlanData,
      });
      Logger.debug(newSubscriptionPlan);
      return newSubscriptionPlan;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(
    id: string,
    updateSubscriptionPlanData: UpdateSubscriptionPlanDto,
  ) {
    try {
      return await this.subscriptionPlanRepository.update({
        where: { id },
        data: updateSubscriptionPlanData,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(
    id: string,
    updateSubscriptionPlanData: UpdateSubscriptionPlanDto,
  ) {
    Logger.debug(updateSubscriptionPlanData);

    try {
      return await this.subscriptionPlanRepository.upsert({
        where: { id },
        data: updateSubscriptionPlanData,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
