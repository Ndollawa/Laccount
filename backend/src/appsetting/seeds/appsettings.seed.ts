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
        ...dashboardDefault,
        name: 'Dashboard',
      });
    }
    if (
      !(await this.appSettingsService.find({
        type: SettingsType.LANDING,
      }))
    ) {
      await this.appSettingsService.create({
        type: SettingsType.LANDING,
        ...landingDefault,
        name: 'Landing',
      });
    }
    if (
      !(await this.appSettingsService.find({
        type: SettingsType.COMPANY_INFO,
      }))
    ) {
      await this.appSettingsService.create({
        type: SettingsType.COMPANY_INFO,
        ...companyInfoDefault,
        name: 'Company',
      });
    }
  }
}
