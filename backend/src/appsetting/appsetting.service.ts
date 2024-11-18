import {
  BadRequestException,
  Injectable,
  Logger,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AppSettings, SettingsType } from '@prisma/client';
import { join } from 'path';
import { handleError, deleteItem } from '@app/common';
import { AppSettingRepository } from '../appsetting/appsetting.repository';
import {
  CreateAppSettingsDto,
  HomeSlide,
  Settings,
  SliderDto,
  LandingConfig,
  UpdateAppSettingsDto,
} from './dto';
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
      });
    } catch (error) {
      handleError(error);
    }
  }
  async exists(query: any): Promise<boolean> {
    try {
      return await this.appSettingsRepository.exists({
        where: query,
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
    let newAppSettings;
    try {
      if (
        !(await this.appSettingsRepository.findFirst({
          where: { type: createAppSettingsData.type },
        }))
      ) {
        newAppSettings = await this.appSettingsRepository.create({
          data: JSON.parse(JSON.stringify(createAppSettingsData)),
        });
      } else {
        newAppSettings = await this.appSettingsRepository.upsert({
          where: { type: createAppSettingsData.type },
          data: JSON.parse(JSON.stringify(createAppSettingsData)),
        });
      }
      this.eventEmitter.emit('AppSettings-created', newAppSettings);
      return newAppSettings;
    } catch (error) {
      handleError(error);
    }
  }

  async update(id: string, updateAppSettingsData: UpdateAppSettingsDto) {
    try {
      return await this.appSettingsRepository.update({
        where: { id },
        data: { ...JSON.parse(JSON.stringify(updateAppSettingsData)) },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsert(id: string, updateAppSettingsData: UpdateAppSettingsDto) {
    try {
      return await this.appSettingsRepository.upsert({
        where: { id },
        data: { ...JSON.parse(JSON.stringify(updateAppSettingsData)) },
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

  private async updateSettingWithFile({
    result,
    type,
    file,
    field,
    destination,
  }: {
    result: any;
    type: string;
    file: any;
    field: string;
    destination: string;
  }) {
    const existingImage = result?.settings?.siteImages?.[field];
    if (existingImage) {
      deleteItem(destination, existingImage);
    }
    return await this.appSettingsRepository.update({
      where: { id: result.id },
      data: {
        settings: {
          ...result.settings,
          siteImages: {
            ...result.settings.siteImages,
            [field]: file ? file.filename : '',
          },
        },
      },
    });
  }

  // Main logic to retrieve settings based on id or type
  private async getSettingsByIdOrType(id: string, type: SettingsType) {
    const result = await this.appSettingsRepository.findFirst({
      where: { OR: [{ id }, { type }] },
    });

    if (!result) {
      throw new Error('Settings not found');
    }
    return result;
  }

  async updateSlider({
    id,
    type,
    file,
    slide,
  }: {
    id: string;
    type: string;
    slide: HomeSlide | SliderDto;
    file: any;
  }) {
    const destination = join('../../', 'uploads/settings/slides');
    if (!file) throw new HttpException('No file Uploaded', 422);

    try {
      const result = await this.getSettingsByIdOrType(id, SettingsType.LANDING);

      // Parse settings from JSON (assuming settings is a JSON string)
      let settings;
      try {
        settings =
          typeof result.settings === 'string'
            ? JSON.parse(result.settings)
            : result.settings;
      } catch (e) {
        throw new Error('Invalid settings format');
      }

      // Ensure sliders is an array
      if (!Array.isArray(settings.sliders)) {
        settings.sliders = [];
      }

      const sImage = settings.sliders.find(
        (s: any) => s.id === slide.id,
      )?.image;
      const count = settings.sliders.length || 0;

      let slidersUpdate;
      switch (type) {
        case 'create':
          slidersUpdate = [
            ...settings.sliders,
            { id: count + 1, ...slide, image: file.filename },
          ];
          break;

        case 'update':
          if (sImage) deleteItem(destination, sImage);
          slidersUpdate = settings.sliders.map((s: any) =>
            s.id === slide.id ? { ...s, ...slide, image: file.filename } : s,
          );
          break;

        case 'delete':
          if (sImage) deleteItem(destination, sImage);
          slidersUpdate = settings.sliders.filter(
            (s: any) => s.id !== slide.id,
          );
          break;

        default:
          throw new Error('Invalid slide operation');
      }

      // Ensure slidersUpdate is a valid object and stringify it before saving
      return await this.appSettingsRepository.update({
        where: { id: result.id },
        data: {
          settings: {
            ...settings,
            sliders: slidersUpdate || [], // Ensure slidersUpdate is not undefined
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upload({ id, type, file }: { id: string; type: string; file: any }) {
    if (!file) return;
    const destination = join('../../', 'uploads/settings/brand');

    try {
      const result = await this.getSettingsByIdOrType(id, SettingsType.LANDING);

      const typeFieldMap: { [key: string]: string } = {
        favicon: 'favicon',
        logo: 'logo',
        logoIcon: 'logoIcon',
        darklogo: 'logoDark',
        pageBg: 'pagesBg',
        bgImage: 'backgroundImage',
        aboutUsBg: 'aboutUsBg',
        aboutVideo: 'aboutVideo',
      };

      if (!typeFieldMap[type]) {
        throw new Error('Invalid type');
      }

      return await this.updateSettingWithFile({
        result,
        type,
        file,
        field: typeFieldMap[type],
        destination,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async removeUpload({
    id,
    type,
    file,
  }: {
    id: string;
    type: string;
    file: any;
  }) {
    if (!file) return;
    const destination = join('../../', 'uploads/settings/brand');

    try {
      const result = await this.getSettingsByIdOrType(id, SettingsType.LANDING);

      const typeFieldMap: { [key: string]: string } = {
        favicon: 'favicon',
        logo: 'logo',
        logoIcon: 'logoIcon',
        darklogo: 'logoDark',
        pageBg: 'pagesBg',
        bgImage: 'backgroundImage',
        aboutUsBg: 'aboutUsBg',
        aboutVideo: 'aboutVideo',
      };

      if (!typeFieldMap[type]) {
        throw new Error('Invalid type');
      }

      return await this.updateSettingWithFile({
        result,
        type,
        file: null, // Remove the file by setting filename to an empty string
        field: typeFieldMap[type],
        destination,
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
