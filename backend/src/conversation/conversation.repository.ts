import { Injectable } from '@nestjs/common';
import { Prisma, Conversation } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class ConversationRepository extends PrismaBaseRepository<
  Conversation,
  | Prisma.ConversationCreateArgs
  | Prisma.ConversationCreateManyArgs
  | Prisma.ConversationCreateInput
  | Prisma.ConversationCreateManyInput
  | Prisma.ConversationUncheckedCreateInput,
  | Prisma.ConversationFindUniqueArgs
  | Prisma.ConversationFindManyArgs
  | Prisma.ConversationFindUniqueOrThrowArgs
  | Prisma.ConversationFindFirstArgs
  | Prisma.ConversationFindFirstOrThrowArgs
  | Prisma.ConversationAggregateArgs
  | Prisma.ConversationGroupByArgs
  | Prisma.ConversationCountArgs,
  | Prisma.ConversationUpdateArgs
  | Prisma.ConversationUpdateManyArgs
  | Prisma.ConversationUpsertArgs
  | Prisma.ConversationUncheckedUpdateInput
  | Prisma.ConversationUncheckedUpdateManyInput,
  Prisma.ConversationDeleteArgs | Prisma.ConversationDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.conversation);
  }

  // Additional methods specific to the Conversation entity can be added here
}
