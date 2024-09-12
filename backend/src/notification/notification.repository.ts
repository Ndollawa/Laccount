import { Injectable } from '@nestjs/common';
import { Prisma, Notification } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class NotificationRepository extends PrismaBaseRepository<
  Notification,
  | Prisma.NotificationCreateArgs
  | Prisma.NotificationCreateManyArgs
  | Prisma.NotificationCreateInput
  | Prisma.NotificationCreateManyInput
  | Prisma.NotificationUncheckedCreateInput,
  | Prisma.NotificationFindUniqueArgs
  | Prisma.NotificationFindManyArgs
  | Prisma.NotificationFindUniqueOrThrowArgs
  | Prisma.NotificationFindFirstArgs
  | Prisma.NotificationFindFirstOrThrowArgs
  | Prisma.NotificationAggregateArgs
  | Prisma.NotificationGroupByArgs
  | Prisma.NotificationCountArgs,
  | Prisma.NotificationUpdateArgs
  | Prisma.NotificationUpdateManyArgs
  | Prisma.NotificationUpsertArgs
  | Prisma.NotificationUncheckedUpdateInput
  | Prisma.NotificationUncheckedUpdateManyInput,
  Prisma.NotificationDeleteArgs | Prisma.NotificationDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.notification);
  }

  // Additional methods specific to the Notification entity can be added here
}
