import { Injectable } from '@nestjs/common';
import { Prisma, Service } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class ServiceRepository extends PrismaBaseRepository<
  Service,
  | Prisma.ServiceCreateArgs
  | Prisma.ServiceCreateManyArgs
  | Prisma.ServiceCreateInput
  | Prisma.ServiceCreateManyInput
  | Prisma.ServiceUncheckedCreateInput,
  | Prisma.ServiceFindUniqueArgs
  | Prisma.ServiceFindManyArgs
  | Prisma.ServiceFindUniqueOrThrowArgs
  | Prisma.ServiceFindFirstArgs
  | Prisma.ServiceFindFirstOrThrowArgs
  | Prisma.ServiceAggregateArgs
  | Prisma.ServiceGroupByArgs
  | Prisma.ServiceCountArgs,
  | Prisma.ServiceUpdateArgs
  | Prisma.ServiceUpdateManyArgs
  | Prisma.ServiceUpsertArgs
  | Prisma.ServiceUncheckedUpdateInput
  | Prisma.ServiceUncheckedUpdateManyInput,
  Prisma.ServiceDeleteArgs | Prisma.ServiceDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.service);
  }

  // Additional methods specific to the Service entity can be added here
}
