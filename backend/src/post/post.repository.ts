import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class PostRepository extends PrismaBaseRepository<
  Post,
  | Prisma.PostCreateArgs
  | Prisma.PostCreateManyArgs
  | Prisma.PostCreateInput
  | Prisma.PostCreateManyInput
  | Prisma.PostUncheckedCreateInput,
  | Prisma.PostFindUniqueArgs
  | Prisma.PostFindManyArgs
  | Prisma.PostFindUniqueOrThrowArgs
  | Prisma.PostFindFirstArgs
  | Prisma.PostFindFirstOrThrowArgs
  | Prisma.PostAggregateArgs
  | Prisma.PostGroupByArgs
  | Prisma.PostCountArgs,
  | Prisma.PostUpdateArgs
  | Prisma.PostUpdateManyArgs
  | Prisma.PostUpsertArgs
  | Prisma.PostUncheckedUpdateInput
  | Prisma.PostUncheckedUpdateManyInput,
  Prisma.PostDeleteArgs | Prisma.PostDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.post);
  }

  // Additional methods specific to the Post entity can be added here
}
