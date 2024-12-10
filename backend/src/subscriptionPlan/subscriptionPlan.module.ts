import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscriptionPlan.service';
import { SubscriptionPlanRepository } from './subscriptionPlan.repository';
import { SubscriptionPlanController } from './subscriptionPlan.controller';

@Module({
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService, SubscriptionPlanRepository],
})
export class SubscriptionPlanModule {}
