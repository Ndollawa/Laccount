import { Injectable } from '@nestjs/common';
import { Prisma, AppSettings } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';

@Injectable()
export class AppSettingRepository extends PrismaBaseRepository<
  AppSettings,
  | Prisma.AppSettingsCreateArgs
  | Prisma.AppSettingsCreateManyArgs
  | Prisma.AppSettingsCreateInput
  | Prisma.AppSettingsCreateManyInput
  | Prisma.AppSettingsUncheckedCreateInput,
  | Prisma.AppSettingsFindUniqueArgs
  | Prisma.AppSettingsFindManyArgs
  | Prisma.AppSettingsFindUniqueOrThrowArgs
  | Prisma.AppSettingsFindFirstArgs
  | Prisma.AppSettingsFindFirstOrThrowArgs
  | Prisma.AppSettingsAggregateArgs
  | Prisma.AppSettingsGroupByArgs
  | Prisma.AppSettingsCountArgs,
  | Prisma.AppSettingsUpdateArgs
  | Prisma.AppSettingsUpdateManyArgs
  | Prisma.AppSettingsUpsertArgs
  | Prisma.AppSettingsUncheckedUpdateInput
  | Prisma.AppSettingsUncheckedUpdateManyInput,
  Prisma.AppSettingsDeleteArgs | Prisma.AppSettingsDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.appSettings);
  }

  // Additional methods specific to the AppSettings entity can be added here
}
