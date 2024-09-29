import { Injectable } from '@nestjs/common';
import { Prisma, SupportTicket } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class SupportTicketRepository extends PrismaBaseRepository<
  SupportTicket,
  | Prisma.SupportTicketCreateArgs
  | Prisma.SupportTicketCreateManyArgs
  | Prisma.SupportTicketCreateInput
  | Prisma.SupportTicketCreateManyInput
  | Prisma.SupportTicketUncheckedCreateInput,
  | Prisma.SupportTicketFindUniqueArgs
  | Prisma.SupportTicketFindManyArgs
  | Prisma.SupportTicketFindUniqueOrThrowArgs
  | Prisma.SupportTicketFindFirstArgs
  | Prisma.SupportTicketFindFirstOrThrowArgs
  | Prisma.SupportTicketAggregateArgs
  | Prisma.SupportTicketGroupByArgs
  | Prisma.SupportTicketCountArgs,
  | Prisma.SupportTicketUpdateArgs
  | Prisma.SupportTicketUpdateManyArgs
  | Prisma.SupportTicketUpsertArgs
  | Prisma.SupportTicketUncheckedUpdateInput
  | Prisma.SupportTicketUncheckedUpdateManyInput,
  Prisma.SupportTicketDeleteArgs | Prisma.SupportTicketDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.supportTicket);
  }

  // Additional methods specific to the SupportTicket entity can be added here
}
