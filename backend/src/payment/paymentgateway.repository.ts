import { Injectable } from '@nestjs/common';
import { Prisma, PaymentGateway } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class PaymentGatewayRepository extends PrismaBaseRepository<
  PaymentGateway,
  | Prisma.PaymentGatewayCreateArgs
  | Prisma.PaymentGatewayCreateManyArgs
  | Prisma.PaymentGatewayCreateInput
  | Prisma.PaymentGatewayCreateManyInput
  | Prisma.PaymentGatewayUncheckedCreateInput,
  | Prisma.PaymentGatewayFindUniqueArgs
  | Prisma.PaymentGatewayFindManyArgs
  | Prisma.PaymentGatewayFindUniqueOrThrowArgs
  | Prisma.PaymentGatewayFindFirstArgs
  | Prisma.PaymentGatewayFindFirstOrThrowArgs
  | Prisma.PaymentGatewayAggregateArgs
  | Prisma.PaymentGatewayGroupByArgs
  | Prisma.PaymentGatewayCountArgs,
  | Prisma.PaymentGatewayUpdateArgs
  | Prisma.PaymentGatewayUpdateManyArgs
  | Prisma.PaymentGatewayUpsertArgs
  | Prisma.PaymentGatewayUncheckedUpdateInput
  | Prisma.PaymentGatewayUncheckedUpdateManyInput,
  Prisma.PaymentGatewayDeleteArgs | Prisma.PaymentGatewayDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.paymentGateway);
  }

  // Additional methods specific to the PaymentGateway entity can be added here
}
