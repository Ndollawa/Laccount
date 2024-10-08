import { Injectable } from '@nestjs/common';
import { Prisma, Faq } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class FaqRepository extends PrismaBaseRepository<
  Faq,
  | Prisma.FaqCreateArgs
  | Prisma.FaqCreateManyArgs
  | Prisma.FaqCreateInput
  | Prisma.FaqCreateManyInput
  | Prisma.FaqUncheckedCreateInput,
  | Prisma.FaqFindUniqueArgs
  | Prisma.FaqFindManyArgs
  | Prisma.FaqFindUniqueOrThrowArgs
  | Prisma.FaqFindFirstArgs
  | Prisma.FaqFindFirstOrThrowArgs
  | Prisma.FaqAggregateArgs
  | Prisma.FaqGroupByArgs
  | Prisma.FaqCountArgs,
  | Prisma.FaqUpdateArgs
  | Prisma.FaqUpdateManyArgs
  | Prisma.FaqUpsertArgs
  | Prisma.FaqUncheckedUpdateInput
  | Prisma.FaqUncheckedUpdateManyInput,
  Prisma.FaqDeleteArgs | Prisma.FaqDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.faq);
  }

  // Additional methods specific to the Faq entity can be added here
}
