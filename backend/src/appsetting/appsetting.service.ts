import {
  BadRequestException,
  Injectable,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AppSettings, SettingsType } from '@prisma/client';
import { handleError } from '@app/common';
import { AppSettingRepository } from '../appsetting/appsetting.repository';
import { CreateAppSettingsDto, UpdateAppSettingsDto } from './dto';
import {
  companyInfoDefault,
  dashboardDefault,
  landingDefault,
} from './appsettings.default';

type SettingData = Omit<AppSettings, 'id' | 'createdAt' | 'updatedAt'>;
@Injectable()
export class AppSettingService {
  constructor(
    protected readonly appSettingsRepository: AppSettingRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async find(query: any): Promise<AppSettings> {
    try {
      return await this.appSettingsRepository.find({
        where: query,
        // include: { seller: true },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAll(query: any): Promise<AppSettings[]> {
    try {
      return await this.appSettingsRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async create(
    createAppSettingsData: CreateAppSettingsDto,
  ): Promise<AppSettings> {
    const { type, ...settings } = createAppSettingsData;
    let data: SettingData;
    switch (type) {
      case 'DASHBOARD':
        data = {
          userDefined: true,
          name: 'DASHBOARD',
          type: SettingsType.DASHBOARD,
          default: dashboardDefault,
          settings,
        };
        break;
      case 'LANDING':
        data = {
          userDefined: true,
          name: 'LANDING',
          type: SettingsType.LANDING,
          default: landingDefault,
          settings,
        };
        break;
      case 'COMPANY_INFO':
        data = {
          userDefined: true,
          name: 'COMPANY_INFO',
          type: SettingsType.COMPANY_INFO,
          default: companyInfoDefault,
          settings,
        };
        break;

      default:
        throw new BadRequestException('Invalid settings format');

        break;
    }
    let newAppSettings;
    try {
      if (
        !(await this.appSettingsRepository.findFirst({
          where: { type: data.type },
        }))
      ) {
        newAppSettings = await this.appSettingsRepository.create({
          data,
        });
      } else {
        newAppSettings = await this.appSettingsRepository.upsert({
          where: { type: data.type },
          data,
        });
      }
      this.eventEmitter.emit('AppSettings-created', newAppSettings);
      return newAppSettings;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async update(id: string, updateAppSettingsData: UpdateAppSettingsDto) {
    const { type, ...settings } = updateAppSettingsData;
    let data: SettingData;
    switch (type) {
      case 'DASHBOARD':
        data = {
          userDefined: false,
          name: 'DASHBOARD',
          type: SettingsType.DASHBOARD,
          default: dashboardDefault,
          settings,
        };
        break;
      case 'LANDING':
        data = {
          userDefined: true,
          name: 'LANDING',
          type: SettingsType.LANDING,
          default: landingDefault,
          settings,
        };
        break;
      case 'COMPANY_INFO':
        data = {
          userDefined: true,
          name: 'COMPANY_INFO',
          type: SettingsType.COMPANY_INFO,
          default: companyInfoDefault,
          settings,
        };
        break;

      default:
        throw new BadRequestException('Invalid settings format');

        break;
    }
    try {
      return await this.appSettingsRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, data: UpdateAppSettingsDto) {
    Logger.debug(data);
    try {
      return await this.appSettingsRepository.upsert({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async remove(id: string): Promise<AppSettings> {
    try {
      return await this.appSettingsRepository.delete({
        where: { id },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // @OnEvent('AppSettings-created')
  // sendVerificationEmail(payload: AppSettings) {
  //   console.log(payload);
  //   return this.mailClient.emit('sendMail', payload);
  // }
}
