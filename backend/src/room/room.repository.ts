import { Injectable } from '@nestjs/common';
import { Prisma, Room } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class RoomRepository extends PrismaBaseRepository<
  Room,
  | Prisma.RoomCreateArgs
  | Prisma.RoomCreateManyArgs
  | Prisma.RoomCreateInput
  | Prisma.RoomCreateManyInput
  | Prisma.RoomUncheckedCreateInput,
  | Prisma.RoomFindUniqueArgs
  | Prisma.RoomFindManyArgs
  | Prisma.RoomFindUniqueOrThrowArgs
  | Prisma.RoomFindFirstArgs
  | Prisma.RoomFindFirstOrThrowArgs
  | Prisma.RoomAggregateArgs
  | Prisma.RoomGroupByArgs
  | Prisma.RoomCountArgs,
  | Prisma.RoomUpdateArgs
  | Prisma.RoomUpdateManyArgs
  | Prisma.RoomUpsertArgs
  | Prisma.RoomUncheckedUpdateInput
  | Prisma.RoomUncheckedUpdateManyInput,
  Prisma.RoomDeleteArgs | Prisma.RoomDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.room);
  }

  // Additional methods specific to the Room entity can be added here
}
