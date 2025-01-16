import { Injectable } from '@nestjs/common';
import { Prisma, MailTemplate } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class MailTemplateRepository extends PrismaBaseRepository<
  MailTemplate,
  | Prisma.MailTemplateCreateArgs
  | Prisma.MailTemplateCreateManyArgs
  | Prisma.MailTemplateCreateInput
  | Prisma.MailTemplateCreateManyInput
  | Prisma.MailTemplateUncheckedCreateInput,
  | Prisma.MailTemplateFindUniqueArgs
  | Prisma.MailTemplateFindManyArgs
  | Prisma.MailTemplateFindUniqueOrThrowArgs
  | Prisma.MailTemplateFindFirstArgs
  | Prisma.MailTemplateFindFirstOrThrowArgs
  | Prisma.MailTemplateAggregateArgs
  | Prisma.MailTemplateGroupByArgs
  | Prisma.MailTemplateCountArgs,
  | Prisma.MailTemplateUpdateArgs
  | Prisma.MailTemplateUpdateManyArgs
  | Prisma.MailTemplateUpsertArgs
  | Prisma.MailTemplateUncheckedUpdateInput
  | Prisma.MailTemplateUncheckedUpdateManyInput,
  Prisma.MailTemplateDeleteArgs | Prisma.MailTemplateDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.mailTemplate);
  }

  // Additional methods specific to the MailTemplate entity can be added here
}
