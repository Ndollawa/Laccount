import { Injectable } from '@nestjs/common';
import { AppSettingService } from './../appsetting.service';

import {
  companyInfoDefault,
  dashboardDefault,
  landingDefault,
} from '../../appsetting/appsettings.default';
import { SettingsType } from '@prisma/client';
import { handleError } from '@app/common';

@Injectable()
export class AppSettingsSeed {
  constructor(private readonly appSettingsService: AppSettingService) {}

  async seedSettings() {
    if (
      !(await this.appSettingsService.exists({
        type: SettingsType.DASHBOARD,
      }))
    ) {
      try {
        return await this.appSettingsService.create({
          type: SettingsType.DASHBOARD,
          settings: dashboardDefault,
          default: dashboardDefault,
          name: SettingsType.DASHBOARD,
          userDefined: false,
        });
      } catch (error) {
        handleError(error);
      }
    }
    if (
      !(await this.appSettingsService.exists({
        type: SettingsType.LANDING,
      }))
    ) {
      try {
        return await this.appSettingsService.create({
          type: SettingsType.LANDING,
          settings: landingDefault,
          default: landingDefault,
          name: SettingsType.LANDING,
          userDefined: false,
        });
      } catch (error) {
        handleError(error);
      }
    }
    if (
      !(await this.appSettingsService.exists({
        type: SettingsType.COMPANY_INFO,
      }))
    ) {
      try {
        return await this.appSettingsService.create({
          type: SettingsType.COMPANY_INFO,
          settings: companyInfoDefault,
          default: companyInfoDefault,
          name: SettingsType.COMPANY_INFO,
          userDefined: false,
        });
      } catch (error) {
        handleError(error);
      }
    }
  }
}
