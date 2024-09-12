import { Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class AccountRepository extends PrismaBaseRepository<
  Account,
  | Prisma.AccountCreateArgs
  | Prisma.AccountCreateManyArgs
  | Prisma.AccountCreateInput
  | Prisma.AccountCreateManyInput
  | Prisma.AccountUncheckedCreateInput,
  | Prisma.AccountFindUniqueArgs
  | Prisma.AccountFindManyArgs
  | Prisma.AccountFindUniqueOrThrowArgs
  | Prisma.AccountFindFirstArgs
  | Prisma.AccountFindFirstOrThrowArgs
  | Prisma.AccountAggregateArgs
  | Prisma.AccountGroupByArgs
  | Prisma.AccountCountArgs,
  Prisma.AccountUpdateArgs | Prisma.AccountUpdateManyArgs | Prisma.AccountUpsertArgs,
  Prisma.AccountDeleteArgs | Prisma.AccountDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.account);
  }

  // Additional methods specific to the Account entity can be added here
}
