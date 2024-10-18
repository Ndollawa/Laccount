import { Injectable } from '@nestjs/common';
import { Prisma, Cart } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class CartRepository extends PrismaBaseRepository<
  Cart,
  | Prisma.CartCreateArgs
  | Prisma.CartCreateManyArgs
  | Prisma.CartCreateInput
  | Prisma.CartCreateManyInput
  | Prisma.CartUncheckedCreateInput,
  | Prisma.CartFindUniqueArgs
  | Prisma.CartFindManyArgs
  | Prisma.CartFindUniqueOrThrowArgs
  | Prisma.CartFindFirstArgs
  | Prisma.CartFindFirstOrThrowArgs
  | Prisma.CartAggregateArgs
  | Prisma.CartGroupByArgs
  | Prisma.CartCountArgs,
  Prisma.CartUpdateArgs | Prisma.CartUpdateManyArgs | Prisma.CartUpsertArgs,
  Prisma.CartDeleteArgs | Prisma.CartDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.cart);
  }

  // Additional methods specific to the Cart entity can be added here
}
