import { Injectable } from '@nestjs/common';
import { Prisma, Listing } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class ListingRepository extends PrismaBaseRepository<
  Listing,
  | Prisma.ListingCreateArgs
  | Prisma.ListingCreateManyArgs
  | Prisma.ListingCreateInput
  | Prisma.ListingCreateManyInput
  | Prisma.ListingUncheckedCreateInput,
  | Prisma.ListingFindUniqueArgs
  | Prisma.ListingFindManyArgs
  | Prisma.ListingFindUniqueOrThrowArgs
  | Prisma.ListingFindFirstArgs
  | Prisma.ListingFindFirstOrThrowArgs
  | Prisma.ListingAggregateArgs
  | Prisma.ListingGroupByArgs
  | Prisma.ListingCountArgs,
  | Prisma.ListingUpdateArgs
  | Prisma.ListingUpdateManyArgs
  | Prisma.ListingUpsertArgs,
  Prisma.ListingDeleteArgs | Prisma.ListingDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.listing);
  }

  // Additional methods specific to the Listing entity can be added here
}
