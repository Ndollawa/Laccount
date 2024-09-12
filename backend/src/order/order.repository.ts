import { Injectable } from '@nestjs/common';
import { Prisma, Order } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class OrderRepository extends PrismaBaseRepository<
  Order,
  | Prisma.OrderCreateArgs
  | Prisma.OrderCreateManyArgs
  | Prisma.OrderCreateInput
  | Prisma.OrderCreateManyInput
  | Prisma.OrderUncheckedCreateInput,
  | Prisma.OrderFindUniqueArgs
  | Prisma.OrderFindManyArgs
  | Prisma.OrderFindUniqueOrThrowArgs
  | Prisma.OrderFindFirstArgs
  | Prisma.OrderFindFirstOrThrowArgs
  | Prisma.OrderAggregateArgs
  | Prisma.OrderGroupByArgs
  | Prisma.OrderCountArgs,
  Prisma.OrderUpdateArgs | Prisma.OrderUpdateManyArgs | Prisma.OrderUpsertArgs,
  Prisma.OrderDeleteArgs | Prisma.OrderDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.order);
  }

  // Additional methods specific to the Order entity can be added here
}
