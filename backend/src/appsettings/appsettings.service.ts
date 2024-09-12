import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { AppSettings} from '@prisma/client';
import { handleError } from '@app/common';
import { AppSettingsRepository } from './appsettings.repository';
import { CreateAppSettingsDto, UpdateAppSettingsDto } from './dto';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class AppSettingsService {
  constructor(
    protected readonly appSettingsRepository: AppSettingsRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}

  async findAppSettings(query: any): Promise<AppSettings> {
    try {
      return await this.appSettingsRepository.find({
        where: query,
        include: { seller: true},
      });
    } catch (error) {
      handleError(error);
    }
  }

  async findAllAppSettingss(query: any): Promise<AppSettings[]> {
    try {
      return await this.appSettingsRepository.findMany(query);
    } catch (error) {
      handleError(error);
    }
  }

  async createAppSettings(createAppSettingsData: CreateAppSettingsDto): Promise<AppSettings> {
    try {
        const newAppSettings = await this.appSettingsRepository.create({
        data:createAppSettingsData,
      });

      this.eventEmitter.emit('AppSettings-created', newAppSettings);
      return newAppSettings;
    } catch (error) {
      Logger.log(error);
      handleError(error);
    }
  }

  async updateAppSettings(id: string, data: UpdateAppSettingsDto) {
    Logger.debug(data);
    try {
      return await this.appSettingsRepository.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      handleError(error);
    }
  }

  async upsertAppSettings(id: string, data: UpdateAppSettingsDto) {
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

  async removeAppSettings(id: string): Promise<AppSettings> {
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
