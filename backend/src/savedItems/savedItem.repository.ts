import { Injectable } from '@nestjs/common';
import { Prisma, SavedItem } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class SavedItemRepository extends PrismaBaseRepository<
  SavedItem,
  | Prisma.SavedItemCreateArgs
  | Prisma.SavedItemCreateManyArgs
  | Prisma.SavedItemCreateInput
  | Prisma.SavedItemCreateManyInput
  | Prisma.SavedItemUncheckedCreateInput,
  | Prisma.SavedItemFindUniqueArgs
  | Prisma.SavedItemFindManyArgs
  | Prisma.SavedItemFindUniqueOrThrowArgs
  | Prisma.SavedItemFindFirstArgs
  | Prisma.SavedItemFindFirstOrThrowArgs
  | Prisma.SavedItemAggregateArgs
  | Prisma.SavedItemGroupByArgs
  | Prisma.SavedItemCountArgs,
  | Prisma.SavedItemUpdateArgs
  | Prisma.SavedItemUpdateManyArgs
  | Prisma.SavedItemUpsertArgs,
  Prisma.SavedItemDeleteArgs | Prisma.SavedItemDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.savedItem);
  }

  // Additional methods specific to the SavedItem entity can be added here
}
