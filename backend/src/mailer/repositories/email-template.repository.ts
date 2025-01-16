import { Injectable } from '@nestjs/common';
import { Prisma, EMailTemplate } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class EMailTemplateRepository extends PrismaBaseRepository<
  EMailTemplate,
  | Prisma.EMailTemplateCreateArgs
  | Prisma.EMailTemplateCreateManyArgs
  | Prisma.EMailTemplateCreateInput
  | Prisma.EMailTemplateCreateManyInput
  | Prisma.EMailTemplateUncheckedCreateInput,
  | Prisma.EMailTemplateFindUniqueArgs
  | Prisma.EMailTemplateFindManyArgs
  | Prisma.EMailTemplateFindUniqueOrThrowArgs
  | Prisma.EMailTemplateFindFirstArgs
  | Prisma.EMailTemplateFindFirstOrThrowArgs
  | Prisma.EMailTemplateAggregateArgs
  | Prisma.EMailTemplateGroupByArgs
  | Prisma.EMailTemplateCountArgs,
  | Prisma.EMailTemplateUpdateArgs
  | Prisma.EMailTemplateUpdateManyArgs
  | Prisma.EMailTemplateUpsertArgs
  | Prisma.EMailTemplateUncheckedUpdateInput
  | Prisma.EMailTemplateUncheckedUpdateManyInput,
  Prisma.EMailTemplateDeleteArgs | Prisma.EMailTemplateDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.eMailTemplate);
  }

  // Additional methods specific to the EMailTemplate entity can be added here
}
