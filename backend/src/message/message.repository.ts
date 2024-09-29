import { Injectable } from '@nestjs/common';
import { Prisma, Message } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class MessageRepository extends PrismaBaseRepository<
  Message,
  | Prisma.MessageCreateArgs
  | Prisma.MessageCreateManyArgs
  | Prisma.MessageCreateInput
  | Prisma.MessageCreateManyInput
  | Prisma.MessageUncheckedCreateInput,
  | Prisma.MessageFindUniqueArgs
  | Prisma.MessageFindManyArgs
  | Prisma.MessageFindUniqueOrThrowArgs
  | Prisma.MessageFindFirstArgs
  | Prisma.MessageFindFirstOrThrowArgs
  | Prisma.MessageAggregateArgs
  | Prisma.MessageGroupByArgs
  | Prisma.MessageCountArgs,
  | Prisma.MessageUpdateArgs
  | Prisma.MessageUpdateManyArgs
  | Prisma.MessageUpsertArgs
  | Prisma.MessageUncheckedUpdateInput
  | Prisma.MessageUncheckedUpdateManyInput,
  Prisma.MessageDeleteArgs | Prisma.MessageDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.message);
  }

  // Additional methods specific to the Message entity can be added here
}
