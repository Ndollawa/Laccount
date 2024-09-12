import { Injectable } from '@nestjs/common';
import { Prisma, Payment } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class PaymentRepository extends PrismaBaseRepository<
  Payment,
  | Prisma.PaymentCreateArgs
  | Prisma.PaymentCreateManyArgs
  | Prisma.PaymentCreateInput
  | Prisma.PaymentCreateManyInput
  | Prisma.PaymentUncheckedCreateInput,
  | Prisma.PaymentFindUniqueArgs
  | Prisma.PaymentFindManyArgs
  | Prisma.PaymentFindUniqueOrThrowArgs
  | Prisma.PaymentFindFirstArgs
  | Prisma.PaymentFindFirstOrThrowArgs
  | Prisma.PaymentAggregateArgs
  | Prisma.PaymentGroupByArgs
  | Prisma.PaymentCountArgs,
  | Prisma.PaymentUpdateArgs
  | Prisma.PaymentUpdateManyArgs
  | Prisma.PaymentUpsertArgs
  | Prisma.PaymentUncheckedUpdateInput
  | Prisma.PaymentUncheckedUpdateManyInput,
  Prisma.PaymentDeleteArgs | Prisma.PaymentDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.payment);
  }

  // Additional methods specific to the Payment entity can be added here
}