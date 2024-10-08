import { Injectable } from '@nestjs/common';
import { AppSettingService } from './../appsetting.service';

import {
  companyInfoDefault,
  dashboardDefault,
  landingDefault,
} from '../../appsetting/appsettings.default';
import { SettingsType } from '@prisma/client';

@Injectable()
export class AppSettingsSeed {
  constructor(private readonly appSettingsService: AppSettingService) {}

  async seedSettings() {
    if (
      !(await this.appSettingsService.find({
        type: SettingsType.DASHBOARD,
      }))
    ) {
      await this.appSettingsService.create({
        type: SettingsType.DASHBOARD,
        settings: dashboardDefault,
        default: dashboardDefault,
        name: SettingsType.DASHBOARD,
        userDefined: false,
      });
    }
    if (
      !(await this.appSettingsService.find({
        type: SettingsType.LANDING,
      }))
    ) {
      await this.appSettingsService.create({
        type: SettingsType.LANDING,
        settings: landingDefault,
        default: landingDefault,
        name: SettingsType.LANDING,
        userDefined: false,
      });
    }
    if (
      !(await this.appSettingsService.find({
        type: SettingsType.COMPANY_INFO,
      }))
    ) {
      await this.appSettingsService.create({
        type: SettingsType.COMPANY_INFO,
        settings: companyInfoDefault,
        default: companyInfoDefault,
        name: SettingsType.COMPANY_INFO,
        userDefined: false,
      });
    }
  }
}
