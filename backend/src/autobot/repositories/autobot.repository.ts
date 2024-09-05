import { Injectable } from '@nestjs/common';
import { Prisma, Autobot } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class AutobotRepository extends PrismaBaseRepository<
  Autobot,
  | Prisma.AutobotCreateArgs
  | Prisma.AutobotCreateManyArgs
  | Prisma.AutobotCreateInput
  | Prisma.AutobotCreateManyInput
  | Prisma.AutobotUncheckedCreateInput,
  | Prisma.AutobotFindUniqueArgs
  | Prisma.AutobotFindManyArgs
  | Prisma.AutobotFindUniqueOrThrowArgs
  | Prisma.AutobotFindFirstArgs
  | Prisma.AutobotFindFirstOrThrowArgs
  | Prisma.AutobotAggregateArgs
  | Prisma.AutobotGroupByArgs
  | Prisma.AutobotCountArgs,
  | Prisma.AutobotUpdateArgs
  | Prisma.AutobotUpdateManyArgs
  | Prisma.AutobotUpsertArgs,
  Prisma.AutobotDeleteArgs | Prisma.AutobotDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.autobot);
  }

  // Additional methods specific to the Autobot entity can be added here
}
