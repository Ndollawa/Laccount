import { Injectable } from '@nestjs/common';
import { Prisma, Subscription } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class SubscriptionRepository extends PrismaBaseRepository<
  Subscription,
  | Prisma.SubscriptionCreateArgs
  | Prisma.SubscriptionCreateManyArgs
  | Prisma.SubscriptionCreateInput
  | Prisma.SubscriptionCreateManyInput
  | Prisma.SubscriptionUncheckedCreateInput,
  | Prisma.SubscriptionFindUniqueArgs
  | Prisma.SubscriptionFindManyArgs
  | Prisma.SubscriptionFindUniqueOrThrowArgs
  | Prisma.SubscriptionFindFirstArgs
  | Prisma.SubscriptionFindFirstOrThrowArgs
  | Prisma.SubscriptionAggregateArgs
  | Prisma.SubscriptionGroupByArgs
  | Prisma.SubscriptionCountArgs,
  | Prisma.SubscriptionUpdateArgs
  | Prisma.SubscriptionUpdateManyArgs
  | Prisma.SubscriptionUpsertArgs
  | Prisma.SubscriptionUncheckedUpdateInput
  | Prisma.SubscriptionUncheckedUpdateManyInput,
  Prisma.SubscriptionDeleteArgs | Prisma.SubscriptionDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.subscription);
  }

  // Additional methods specific to the Subscription entity can be added here
}
