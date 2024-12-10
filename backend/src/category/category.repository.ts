import { Injectable } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class CategoryRepository extends PrismaBaseRepository<
  Category,
  | Prisma.CategoryCreateArgs
  | Prisma.CategoryCreateManyArgs
  | Prisma.CategoryCreateInput
  | Prisma.CategoryCreateManyInput
  | Prisma.CategoryUncheckedCreateInput,
  | Prisma.CategoryFindUniqueArgs
  | Prisma.CategoryFindManyArgs
  | Prisma.CategoryFindUniqueOrThrowArgs
  | Prisma.CategoryFindFirstArgs
  | Prisma.CategoryFindFirstOrThrowArgs
  | Prisma.CategoryAggregateArgs
  | Prisma.CategoryGroupByArgs
  | Prisma.CategoryCountArgs,
  | Prisma.CategoryUpdateArgs
  | Prisma.CategoryUpdateManyArgs
  | Prisma.CategoryUpsertArgs
  | Prisma.CategoryUncheckedUpdateInput
  | Prisma.CategoryUncheckedUpdateManyInput,
  Prisma.CategoryDeleteArgs | Prisma.CategoryDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.category);
  }

  // Additional methods specific to the Category entity can be added here
}
