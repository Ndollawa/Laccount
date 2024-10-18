import { Injectable } from '@nestjs/common';
import { Prisma, CartItem } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class CartItemRepository extends PrismaBaseRepository<
  CartItem,
  | Prisma.CartItemCreateArgs
  | Prisma.CartItemCreateManyArgs
  | Prisma.CartItemCreateInput
  | Prisma.CartItemCreateManyInput
  | Prisma.CartItemUncheckedCreateInput,
  | Prisma.CartItemFindUniqueArgs
  | Prisma.CartItemFindManyArgs
  | Prisma.CartItemFindUniqueOrThrowArgs
  | Prisma.CartItemFindFirstArgs
  | Prisma.CartItemFindFirstOrThrowArgs
  | Prisma.CartItemAggregateArgs
  | Prisma.CartItemGroupByArgs
  | Prisma.CartItemCountArgs,
  | Prisma.CartItemUpdateArgs
  | Prisma.CartItemUpdateManyArgs
  | Prisma.CartItemUpsertArgs,
  Prisma.CartItemDeleteArgs | Prisma.CartItemDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.cartItem);
  }

  // Additional methods specific to the CartItem entity can be added here
}
