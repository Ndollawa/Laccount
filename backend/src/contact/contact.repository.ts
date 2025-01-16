import { Injectable } from '@nestjs/common';
import { Prisma, Contact } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class ContactRepository extends PrismaBaseRepository<
  Contact,
  | Prisma.ContactCreateArgs
  | Prisma.ContactCreateManyArgs
  | Prisma.ContactCreateInput
  | Prisma.ContactCreateManyInput
  | Prisma.ContactUncheckedCreateInput,
  | Prisma.ContactFindUniqueArgs
  | Prisma.ContactFindManyArgs
  | Prisma.ContactFindUniqueOrThrowArgs
  | Prisma.ContactFindFirstArgs
  | Prisma.ContactFindFirstOrThrowArgs
  | Prisma.ContactAggregateArgs
  | Prisma.ContactGroupByArgs
  | Prisma.ContactCountArgs,
  | Prisma.ContactUpdateArgs
  | Prisma.ContactUpdateManyArgs
  | Prisma.ContactUpsertArgs
  | Prisma.ContactUncheckedUpdateInput
  | Prisma.ContactUncheckedUpdateManyInput,
  Prisma.ContactDeleteArgs | Prisma.ContactDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.contact);
  }

  // Additional methods specific to the Contact entity can be added here
}
