import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class TeamRepository extends PrismaBaseRepository<
  Team,
  | Prisma.TeamCreateArgs
  | Prisma.TeamCreateManyArgs
  | Prisma.TeamCreateInput
  | Prisma.TeamCreateManyInput
  | Prisma.TeamUncheckedCreateInput,
  | Prisma.TeamFindUniqueArgs
  | Prisma.TeamFindManyArgs
  | Prisma.TeamFindUniqueOrThrowArgs
  | Prisma.TeamFindFirstArgs
  | Prisma.TeamFindFirstOrThrowArgs
  | Prisma.TeamAggregateArgs
  | Prisma.TeamGroupByArgs
  | Prisma.TeamCountArgs,
  | Prisma.TeamUpdateArgs
  | Prisma.TeamUpdateManyArgs
  | Prisma.TeamUpsertArgs
  | Prisma.TeamUncheckedUpdateInput
  | Prisma.TeamUncheckedUpdateManyInput,
  Prisma.TeamDeleteArgs | Prisma.TeamDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.team);
  }

  // Additional methods specific to the Team entity can be added here
}
