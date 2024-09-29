import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class TransactionRepository extends PrismaBaseRepository<
  Transaction,
  | Prisma.TransactionCreateArgs
  | Prisma.TransactionCreateManyArgs
  | Prisma.TransactionCreateInput
  | Prisma.TransactionCreateManyInput
  | Prisma.TransactionUncheckedCreateInput,
  | Prisma.TransactionFindUniqueArgs
  | Prisma.TransactionFindManyArgs
  | Prisma.TransactionFindUniqueOrThrowArgs
  | Prisma.TransactionFindFirstArgs
  | Prisma.TransactionFindFirstOrThrowArgs
  | Prisma.TransactionAggregateArgs
  | Prisma.TransactionGroupByArgs
  | Prisma.TransactionCountArgs,
  | Prisma.TransactionUpdateArgs
  | Prisma.TransactionUpdateManyArgs
  | Prisma.TransactionUpsertArgs
  | Prisma.TransactionUncheckedUpdateInput
  | Prisma.TransactionUncheckedUpdateManyInput,
  Prisma.TransactionDeleteArgs | Prisma.TransactionDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.transaction);
  }

  // Additional methods specific to the Transaction entity can be added here
}
