import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class CommentRepository extends PrismaBaseRepository<
  Comment,
  | Prisma.CommentCreateArgs
  | Prisma.CommentCreateManyArgs
  | Prisma.CommentCreateInput
  | Prisma.CommentCreateManyInput
  | Prisma.CommentUncheckedCreateInput,
  | Prisma.CommentFindUniqueArgs
  | Prisma.CommentFindManyArgs
  | Prisma.CommentFindUniqueOrThrowArgs
  | Prisma.CommentFindFirstArgs
  | Prisma.CommentFindFirstOrThrowArgs
  | Prisma.CommentAggregateArgs
  | Prisma.CommentGroupByArgs
  | Prisma.CommentCountArgs,
  | Prisma.CommentUpdateArgs
  | Prisma.CommentUpdateManyArgs
  | Prisma.CommentUpsertArgs
  | Prisma.CommentUncheckedUpdateInput
  | Prisma.CommentUncheckedUpdateManyInput,
  Prisma.CommentDeleteArgs | Prisma.CommentDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.comment);
  }

  // Additional methods specific to the Comment entity can be added here
}
