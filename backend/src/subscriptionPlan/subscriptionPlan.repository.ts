import { Injectable } from '@nestjs/common';
import { Prisma, SubscriptionPlan } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class SubscriptionPlanRepository extends PrismaBaseRepository<
  SubscriptionPlan,
  | Prisma.SubscriptionPlanCreateArgs
  | Prisma.SubscriptionPlanCreateManyArgs
  | Prisma.SubscriptionPlanCreateInput
  | Prisma.SubscriptionPlanCreateManyInput
  | Prisma.SubscriptionPlanUncheckedCreateInput,
  | Prisma.SubscriptionPlanFindUniqueArgs
  | Prisma.SubscriptionPlanFindManyArgs
  | Prisma.SubscriptionPlanFindUniqueOrThrowArgs
  | Prisma.SubscriptionPlanFindFirstArgs
  | Prisma.SubscriptionPlanFindFirstOrThrowArgs
  | Prisma.SubscriptionPlanAggregateArgs
  | Prisma.SubscriptionPlanGroupByArgs
  | Prisma.SubscriptionPlanCountArgs,
  | Prisma.SubscriptionPlanUpdateArgs
  | Prisma.SubscriptionPlanUpdateManyArgs
  | Prisma.SubscriptionPlanUpsertArgs
  | Prisma.SubscriptionPlanUncheckedUpdateInput
  | Prisma.SubscriptionPlanUncheckedUpdateManyInput,
  Prisma.SubscriptionPlanDeleteArgs | Prisma.SubscriptionPlanDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.subscriptionPlan);
  }

  // Additional methods specific to the SubscriptionPlan entity can be added here
}
