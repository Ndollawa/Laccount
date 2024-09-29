import { Injectable } from '@nestjs/common';
import { Prisma, AccountDetails } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class AccountDetailsRepository extends PrismaBaseRepository<
  AccountDetails,
  | Prisma.AccountDetailsCreateArgs
  | Prisma.AccountDetailsCreateManyArgs
  | Prisma.AccountDetailsCreateInput
  | Prisma.AccountDetailsCreateManyInput
  | Prisma.AccountDetailsUncheckedCreateInput,
  | Prisma.AccountDetailsFindUniqueArgs
  | Prisma.AccountDetailsFindManyArgs
  | Prisma.AccountDetailsFindUniqueOrThrowArgs
  | Prisma.AccountDetailsFindFirstArgs
  | Prisma.AccountDetailsFindFirstOrThrowArgs
  | Prisma.AccountDetailsAggregateArgs
  | Prisma.AccountDetailsGroupByArgs
  | Prisma.AccountDetailsCountArgs,
  | Prisma.AccountDetailsUpdateArgs
  | Prisma.AccountDetailsUpdateManyArgs
  | Prisma.AccountDetailsUpsertArgs,
  Prisma.AccountDetailsDeleteArgs | Prisma.AccountDetailsDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.accountDetails);
  }

  // Additional methods specific to the Account entity can be added here
}
