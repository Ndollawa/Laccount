import { Injectable } from '@nestjs/common';
import { Prisma, Wallet } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class WalletRepository extends PrismaBaseRepository<
  Wallet,
  | Prisma.WalletCreateArgs
  | Prisma.WalletCreateManyArgs
  | Prisma.WalletCreateInput
  | Prisma.WalletCreateManyInput
  | Prisma.WalletUncheckedCreateInput,
  | Prisma.WalletFindUniqueArgs
  | Prisma.WalletFindManyArgs
  | Prisma.WalletFindUniqueOrThrowArgs
  | Prisma.WalletFindFirstArgs
  | Prisma.WalletFindFirstOrThrowArgs
  | Prisma.WalletAggregateArgs
  | Prisma.WalletGroupByArgs
  | Prisma.WalletCountArgs,
  | Prisma.WalletUpdateArgs
  | Prisma.WalletUpdateManyArgs
  | Prisma.WalletUpsertArgs
  | Prisma.WalletUncheckedUpdateInput
  | Prisma.WalletUncheckedUpdateManyInput,
  Prisma.WalletDeleteArgs | Prisma.WalletDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.wallet);
  }

  // Additional methods specific to the wallet entity can be added here
}
