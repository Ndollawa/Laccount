import { Module } from '@nestjs/common';
import { AppSettingService } from './appsetting.service';
import { AppSettingRepository } from './appsetting.repository';
import { AppSettingController } from './appsetting.controller';
import { AppSettingsSeed } from './seeds/appsettings.seed';

@Module({
  controllers: [AppSettingController],
  providers: [AppSettingRepository, AppSettingService, AppSettingsSeed],
  exports: [AppSettingService, AppSettingsSeed],
})
export class AppsettingModule {}
