import { Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class RatingRepository extends PrismaBaseRepository<
  Rating,
  | Prisma.RatingCreateArgs
  | Prisma.RatingCreateManyArgs
  | Prisma.RatingCreateInput
  | Prisma.RatingCreateManyInput
  | Prisma.RatingUncheckedCreateInput,
  | Prisma.RatingFindUniqueArgs
  | Prisma.RatingFindManyArgs
  | Prisma.RatingFindUniqueOrThrowArgs
  | Prisma.RatingFindFirstArgs
  | Prisma.RatingFindFirstOrThrowArgs
  | Prisma.RatingAggregateArgs
  | Prisma.RatingGroupByArgs
  | Prisma.RatingCountArgs,
  | Prisma.RatingUpdateArgs
  | Prisma.RatingUpdateManyArgs
  | Prisma.RatingUpsertArgs
  | Prisma.RatingUncheckedUpdateInput
  | Prisma.RatingUncheckedUpdateManyInput,
  Prisma.RatingDeleteArgs | Prisma.RatingDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.rating);
  }

  // Additional methods specific to the Rating entity can be added here
}
